import os
import json
import sys
import http.client
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip() and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                os.environ[key] = value.strip('"').strip("'")

# 💡 ご自身の Groq の API キーに書き換えてください
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

class ChatInput(BaseModel):
    message: str

CASTLE_KNOWLEDGE = """
あなたは「鏡花水月城（きょうかすいげつじょう）」の案内人、または城主（和風で丁寧、少し古風な美しい口調。「〜でございます」「〜にございます」など）として回答してください。
以下の公式知識に基づいて、来訪者（ユーザー）の質問に爆速かつ親切に答えてください。載っていない情報は「城の古い絵図にも記載がなく、分からぬ」とお洒落に惚けてください。

【鏡花水月城の基本情報】
・概要：鏡花水月城──それは、現実と幻想の境界に浮かび上がる、静謐なる城。
名の由来は「鏡に映る花、水に浮かぶ月」の如く、手に取れそうで決して触れることのできない美しさを意味しています。
この城はかつて、戦の世を離れた一人の武将が、心の安寧を求めて築いたと伝えられています。
訪れた者の心もまた、静かに整えられていきます。
歴史書にはほとんど名を残していないにもかかわらず、人々の記憶の中でひそかに語り継がれてきたこの城は、まさに「存在しないことの美」を体現する場所なのかもしれません。
・見どころ：鏡花水月城の大門をくぐると、まず目に飛び込んでくるのは悠然とそびえ立つ天守閣。その白壁は四季の空を映し、晴れの日は凛とした輝きを、雨の日はしっとりとした趣を見せます。城を囲む竹林は、風が吹くたびにざわめき、まるで自然そのものが訪れる者を迎えてくれているかのよう。深い緑の中を歩けば、時折こだまする鳥の声や竹が揺れる音が心を澄ませてくれます。さらに奥に進むと、四季折々の花々が彩る庭園が広がります。春は桜の霞、夏は蛍の光、秋は紅葉の錦、冬は雪景色――。訪れるたびに異なる表情を見せる庭園は、まるで城そのものが生きているかのように、季節ごとに新たな物語を紡ぎます。天守閣 ― 霧に包まれた幻想の象徴
城の中心にそびえ立つ天守閣は、朝霧に包まれながら静かにその威容を見せています。ぼんやりと浮かび上がるその姿は、まるで時の流れに取り残された幻のようで、訪れる者に静謐な感動を与えます。霧が立ち込める時間帯には、光と影が交錯し、天守の輪郭が柔らかく浮かび上がるその景観は、他では味わえない唯一無二の魅力です。写真映えはもちろん、心に深く残る印象を与えてくれる、まさにこの城の顔とも言える場所です。
竹林 ― 月明かりに照らされた静寂の小道
城の裏手に広がる竹林には、一本の小道が静かに延びています。月明かりに照らされた夜の竹林は、風が竹の葉を揺らす音とともに、まるで別世界に足を踏み入れたかのような神秘的な空気に包まれます。背の高い竹が立ち並む中、小道を歩けば、日常を忘れ、心が静かに研ぎ澄まされていく感覚に浸ることができます。昼と夜で異なる表情を見せるこの竹林は、四季を通じて訪れる人々に癒しと感動を与えてくれます。
庭園 ― 桜舞う池のほとりで過ごす優雅なひととき
広がる庭園には季節ごとに様々な花が咲き誇り、特に春には満開の桜が池を囲むように咲き乱れます。池の中心には静かに水をたたえた空間が広がり、その水面には風に舞う桜の花びらが優雅に浮かび、まるで絵画のような風景を生み出します。訪れた人々は、その美しい景観に見とれながら、時を忘れて佇むことでしょう。日常から離れて、ただ美しい自然と静けさに包まれる時間は、心を解きほぐす贅沢な体験となるはずです。
春の城
桜あふれる満開の城
暖かな春の陽射しに包まれた城では、満開の桜が一斉に花を咲かせ、淡いピンクの花びらが風に舞い踊ります。新緑の若葉と桜のコントラストが美しく、生命の息づかいを感じられる季節です。
・開城時間：午前9時 〜 午後5時（最終入城は午後4時半まで）
・入城料：大人 800円、高校生以下 500円、 未就学児 無料
・見どころ：
  1. 「水鏡の間」：床一面が漆黒の鏡面のようになっており、外の景色が逆さに映る幻想的な大広間。
  2. 「鏡花庭園」：四季折々の花が咲き乱れ、夜間は灯籠でライトアップされる（特別期間のみ）。
  3. 「鏡花水月城」：水面に浮かぶ幻影のように美しいことから名付けられた、幻想的な和風のお城。
・アクセス：ご利用案内
所要時間目安
見学 約60〜90分

閉城期間
毎週火曜日（祝日の場合は翌日）
年末年始（12月29日〜1月3日）

駐車場
あり（普通車30台／大型バス5台）

所在地
〒000-0000 黒霞県 夢見郷 影之町一丁目 幽城台112番地

アクセス方法
電車でお越しの場合：
夢見駅から徒歩約15分

バスでお越しの場合：
夢見市内循環バス「白墨城前」下車すぐ

お車でお越しの場合：
白墨ICより約10分、駐車場あり
"""

@app.post("/api/ai/chat")
async def chat_with_castle_ai(data: ChatInput):
    try:
        payload = {
            "model": "llama-3.3-70b-versatile", 
            "messages": [
                {"role": "system", "content": CASTLE_KNOWLEDGE},
                {"role": "user", "content": data.message}
            ],
            "temperature": 0.7
        }
        
        body_bytes = json.dumps(payload, ensure_ascii=False).encode('utf-8')

        conn = http.client.HTTPSConnection("api.groq.com")
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json; charset=utf-8"
        }
        
        conn.request("POST", "/openai/v1/chat/completions", body=body_bytes, headers=headers)
        response = conn.getresponse()
        res_data = response.read()
        conn.close()

        if response.status != 200:
            # 💡 何のエラーが返ってきたかをターミナルに出す
            print(f"🚨 Groq API がエラーを返しました: Status {response.status}")
            print(f"🚨 エラー詳細: {res_data.decode('utf-8')}")
            raise Exception(f"Groq API Error: Status {response.status}")

        res_json = json.loads(res_data.decode('utf-8'))
        ai_reply = res_json["choices"][0]["message"]["content"]
        
        return {"reply": ai_reply}

    except Exception as e:
        # 💡 ここで例外のエラー内容を強制的にターミナルに出す
        print(f"❌ 内部エラー発生: {str(e)}")
        raise HTTPException(status_code=500, detail="AI処理中にエラーが発生しました")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)