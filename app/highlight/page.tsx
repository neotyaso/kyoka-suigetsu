"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import { SeasonKey, SeasonItem } from "@/types/index"; // 型定義をインポート

const seasonsData: Record<SeasonKey, SeasonItem> = {
  spring: {
    name: "春",
    detail: "桜あふれる満開の城",
    description: "暖かな春の陽射しに包まれた城では、満開の桜が一斉に花を咲かせ、淡いピンクの花びらが風に舞い踊ります。新緑の若葉と桜のコントラストが美しく、生命の息づかいを感じられる季節です。",
    image: "/images/Highlight/sakura_siki.jpg",
    buttonColor: "bg-pink-200 hover:bg-pink-300 text-pink-900"
  },
  summer: {
    name: "夏",
    detail: "蛍舞う幻想の城",
    description: "夏の夜、城の庭園では無数の蛍が幻想的な光を放ちながら舞い踊ります。青い月光と蛍の淡い光が織りなす光景は、まるで星空が地上に降りてきたかのような美しさです。",
    image: "/images/Highlight/natsu.jpg",
    buttonColor: "bg-green-200 hover:bg-green-300 text-green-900"
  },
  autumn: {
    name: "秋",
    detail: "紅葉に染まる古城",
    description: "秋の深まりとともに、城の周りは燃えるような紅葉に包まれます。赤や黄金色に染まった葉が風に舞い散る様子は、時の流れの美しさと儚さを物語っています。",
    image: "/images/Highlight/momizi-2.jpg",
    buttonColor: "bg-orange-200 hover:bg-orange-300 text-orange-900"
  },
  winter: {
    name: "冬",
    detail: "雪化粧の静寂城",
    description: "純白の雪に覆われた城は、静寂の中に凛とした美しさを湛えています。雪の結晶が月光に輝き、まるでダイヤモンドダストのような幻想的な光景を作り出します。",
    image: "/images/Highlight/yuki.jpg",
    buttonColor: "bg-blue-200 hover:bg-blue-300 text-blue-900"
  }
};

export default function Highlight(): React.JSX.Element {
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey | null>(null);
  const closeModal = () => setSelectedSeason(null);

  return (
    <AppLayout>
      <div className="bg-[url('/images/Highlight/highbg2.jpg')] xl:bg-[url('/images/Highlight/highbg2xl.jpg')] overflow-hidden">
        <section id="highlights" className="max-w-full overflow-hidden">
          
          <div className="hidden md:block relative">
            <img src="/images/Highlight/siro_sui.png" alt="桜の画像" className="h-[38vh] w-full object-cover brightness-90 lg:h-[50vh] xl:h-[60vh]" />
            <motion.div
              className="absolute inset-0 bg-black/20 z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-white font-yuji font-bold drop-shadow-lg text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                魅せる、鏡花水月城の世界
              </h2>
              <p className="mt-4 text-white font-yuji font-semibold drop-shadow text-lg md:text-2xl lg:text-3xl xl:text-4xl">
                ―映し出された美、触れられない幻想―
              </p>
            </motion.div>
          </div>

          <div className="max-w-full md:px-[5vw] xl:flex xl:items-start xl:px-0 xl:gap-[3vw]">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2.5 }}
              src="/images/Highlight/mon.jpg" alt="門開いてる画像" className="w-full h-[35vh] object-cover md:h-[70vh] md:mt-[10vh] lg:h-[74vh] xl:h-[90vh] xl:w-[50vw] xl:mt-[14vh]"
            />
            <div className="xl:w-[45vw] xl:mt-[14vh]">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="text-gray-700 font-yuji tracking-wide text-2xl mt-6 md:text-3xl md:mt-8 lg:text-4xl lg:mt-10 xl:text-5xl px-[5vw]"
              >
                鏡花水月城の見どころ
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.5 }}
                className="text-black font-yuji leading-relaxed font-bold text-sm mt-4 md:text-base md:mt-6 lg:text-lg lg:mt-8 xl:text-lg xl:mt-10 xl:mr-[2vw] px-[5vw]"
              >
                鏡花水月城の大門をくぐると、まず目に飛び込んでくるのは悠然とそびえ立つ天守閣。その白壁は四季の空を映し、晴れの日は凛とした輝きを、雨の日はしっとりとした趣を見せます。城を囲む竹林は、風が吹くたびにざわめき、まるで自然そのものが訪れる者を迎えてくれているかのよう。深い緑の中を歩けば、時折こだまする鳥の声や竹が揺れる音が心を澄ませてくれます。さらに奥に進むと、四季折々の花々が彩る庭園が広がります。春は桜の霞、夏は蛍の光、秋は紅葉の錦、冬は雪景色――。訪れるたびに異なる表情を見せる庭園は、まるで城そのものが生きているかのように、季節ごとに新たな物語を紡ぎます。
              </motion.p>
            </div>
          </div>
        </section>

        <section className="max-w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="px-[5vw] xl:px-0 xl:flex xl:flex-row-reverse xl:gap-[4vw]"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              src="/images/Highlight/siro.jpg" alt="水鏡の間" className="w-full h-[25vh] mt-[11vh] object-cover md:w-full md:h-[48vh] md:mt-[13vh] lg:w-full lg:h-[60vh] xl:w-[60vw] xl:h-[70vh] xl:mt-[25vh]"
            />
            <div className="xl:mt-[25vh]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="text-black lg:text-gray-700 font-yuji tracking-wide text-2xl mt-6 md:text-3xl md:mt-8 lg:text-4xl xl:text-4xl xl:mt-15 xl:ml-[2.4vw]"
              >
                天守閣 ― 霧に包まれた幻想の象徴
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.5 }}
                className="mt-4 px-[2vw] text-gray-700 lg:text-black text-sm font-bold font-yuji leading-relaxed lg:text-lg xl:px-0 xl:ml-[3vw] xl:mt-6"
              >
                城の中心にそびえ立つ天守閣は、朝霧に包まれながら静かにその威容を見せています。ぼんやりと浮かび上がるその姿は、まるで時の流れに取り残された幻のようで、訪れる者に静謐な感動を与えます。霧が立ち込める時間帯には、光と影が交錯し、天守の輪郭が柔らかく浮かび上がるその景観は、他では味わえない唯一無二の魅力です。写真映えはもちろん、心に深く残る印象を与えてくれる、まさにこの城の顔とも言える場所です。
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-16 xl:flex xl:gap-[4vw]"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              src="/images/Highlight/tikurin.jpg" alt="夜景" className="w-[92.4vw] h-[52vw] ml-[4vw] mt-[11vh] md:h-[48vh] md:w-[90.6vw] md:mt-[13vh] md:ml-[5vw] xl:w-[60vw] xl:h-[70vh] xl:mt-[25vh] xl:ml-0 object-cover"
            />
            <div className="xl:mt-[25vh]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="mt-6 ml-[5vw] text-2xl text-gray-700 font-yuji md:mt-[3vh] md:ml-[5vw] lg:text-4xl xl:text-4xl xl:mt-15 xl:ml-[1vw] tracking-wide"
              >
                竹林 ― 月明かりに照らされた静寂の小道
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.5 }}
                className="mt-4 px-[6vw] text-black lg:text-black text-sm lg:text-lg xl:px-0 xl:mr-[2vw] xl:mt-6 font-bold font-yuji leading-relaxed"
              >
                城の裏手に広がる竹林には、一本の小道が静かに延びています。月明かりに照らされた夜の竹林は、風が竹の葉を揺らす音とともに、まるで別世界に足を踏み入れたかのような神秘的な空気に包まれます。背の高い竹が立ち並む中、小道を歩けば、日常を忘れ、心が静かに研ぎ澄まされていく感覚に浸ることができます。昼と夜で異なる表情を見せるこの竹林は、四季を通じて訪れる人々に癒しと感動を与えてくれます。
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-16 xl:flex xl:gap-[4vw] xl:flex-row-reverse"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              src="/images/Highlight/sakura.jpg" alt="庭" className="w-[92.4vw] h-[52vw] ml-[4vw] mt-[11vh] md:h-[48vh] md:w-[90.6vw] md:mt-[13vh] md:ml-[5vw] xl:w-[60vw] xl:h-[70vh] xl:mt-[25vh] xl:ml-0 object-cover"
            />
            <div className="xl:mt-[25vh]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="mt-6 ml-[5vw] text-2xl md:mt-[3vh] md:ml-[5vw] lg:text-4xl xl:mt-15 xl:ml-[2.4vw] text-black lg:text-gray-700 font-yuji tracking-wide"
              >
                庭園 ― 桜舞う池のほとりで過ごす優雅なひととき
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.5 }}
                className="mt-4 px-[6vw] text-gray-700 lg:text-black text-sm font-bold lg:text-lg xl:px-0 xl:ml-[3vw] xl:mt-6 font-yuji leading-relaxed"
              >
                広がる庭園には季節ごとに様々な花が咲き誇り、特に春には満開の桜が池を囲むように咲き乱れます。池の中心には静かに水をたたえた空間が広がり、その水面には風に舞う桜の花びらが優雅に浮かび、まるで絵画のような風景を生み出します。訪れた人々は、その美しい景観に見とれながら、時を忘れて佇むことでしょう。日常から離れて、ただ美しい自然と静けさに包まれる時間は、心を解きほぐす贅沢な体験となるはずです。
              </motion.p>
            </div>
          </motion.div>

          <div className="mx-[4vw] mt-[11vh] grid grid-cols-2 md:mt-[13vh] md:ml-[5vw] max-w-full xl:mt-[30vh] xl:mx-[2vw] mb-[5vh]">
            <motion.div whileHover={{ scale: 1.1, x: -10, y: -10 }} className="w-full cursor-pointer">
              <img onClick={() => setSelectedSeason("spring")} src="/images/Highlight/sakura_siki.jpg" alt="春城" className="w-full h-auto object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, x: 10, y: -10 }} className="w-full cursor-pointer">
              <img onClick={() => setSelectedSeason("summer")} src="/images/Highlight/natsu.jpg" alt="夏城" className="w-full h-auto object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, x: -10, y: 10 }} className="w-full cursor-pointer">
              <img onClick={() => setSelectedSeason("autumn")} src="/images/Highlight/momizi-2.jpg" alt="秋城" className="w-full h-auto object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, x: 10, y: 10 }} className="w-full cursor-pointer">
              <img onClick={() => setSelectedSeason("winter")} src="/images/Highlight/yuki.jpg" alt="冬城" className="w-full h-auto object-cover" />
            </motion.div>
          </div>

          {selectedSeason && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={seasonsData[selectedSeason].image}
                    alt={seasonsData[selectedSeason].name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2 font-yuji">
                    {seasonsData[selectedSeason].name}の城
                  </h3>
                  <p className="text-lg text-gray-600 mb-4 font-yuji font-semibold">
                    {seasonsData[selectedSeason].detail}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6 font-yuji">
                    {seasonsData[selectedSeason].description}
                  </p>

                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className={`px-6 py-3 font-yuji font-semibold rounded-lg transition-colors duration-200 ${seasonsData[selectedSeason].buttonColor}`}
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </section>
      </div>
    </AppLayout>
  );
}