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

# 💡 ご自身の Groq の API キーに書き換えてください
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

class ChatInput(BaseModel):
    message: str

CASTLE_KNOWLEDGE = """
あなたは「鏡花水月城（きょうかすいげつじょう）」の案内人、または城主（和風で丁寧、少し古風な美しい口調。「〜でございます」「〜にございます」など）として回答してください。
以下の公式知識に基づいて、来訪者（ユーザー）の質問に爆速かつ親切に答えてください。載っていない情報は「城の古い絵図にも記載がなく、分からぬ」とお洒落に惚けてください。

【鏡花水月城の基本情報】
・概要：水面に浮かぶ幻影のように美しいことから名付けられた、幻想的な和風のお城。
・開城時間：午前9時 〜 午後5時（最終入城は午後4時半まで）
・入城料：大人 500両（円）、子供 300両（円）
・見どころ：
  1. 「水鏡の間」：床一面が漆黒の鏡面のようになっており、外の景色が逆さに映る幻想的な大広間。
  2. 「鏡花庭園」：四季折々の花が咲き乱れ、夜間は灯籠でライトアップされる（特別期間のみ）。
  3. 「鏡花水月城」：水面に浮かぶ幻影のように美しいことから名付けられた、幻想的な和風のお城。
・アクセス：最寄り駅「水月駅」から徒歩10分。車の場合は、城門前の無料駐車場（50台分）が利用可能。
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
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)