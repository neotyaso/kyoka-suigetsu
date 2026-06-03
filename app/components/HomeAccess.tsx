"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from '../constants/animations';
import { AccessInfoItem } from '@/types/index';

const accessData: AccessInfoItem[] = [
  {
    title: "開城時間",
    content: (
      <>
        <p>開城時間</p>
        <p>9:00〜17:00（最終入場 16:30）</p>
      </>
    ),
  },
  {
    title: "閉城時間",
    content: (
      <>
        <p>毎週火曜日（祝日の場合は翌日）</p>
        <p>年末年始（12月29日〜1月3日）</p>
      </>
    ),
  },
  {
    title: "所要時間目安",
    content: <p>見学 約60〜90分</p>,
  },
  {
    title: "駐車場",
    content: <p>あり（普通車30台／大型バス5台）</p>,
  },
  {
    title: "入場料",
    content: (
      <>
        <p>一般：800円</p>
        <p>高校生以下：400円</p>
        <p>未就学児：無料</p>
      </>
    ),
  },
  {
    title: "所在地",
    content: (
      <>
        <p>〒000-0000</p>
        <p>黒霞県 夢見郷 影之町一丁目</p>
        <p>幽城台112番地</p>
      </>
    ),
  },
  {
    title: "アクセス方法",
    content: (
      <>
        <p>電車でお越しの場合</p>
        <p className="border-b border-black/10 pb-1 mb-2">夢見駅から徒歩約15分</p>
        <p>バスでお越しの場合</p>
        <p className="border-b border-black/10 pb-1 mb-2">夢見市内循環バス「白墨城前」下車すぐ</p>
        <p>お車でお越しの場合</p>
        <p>白墨ICより約10分、駐車場あり</p>
      </>
    ),
  },
];

export default function HomeAccess(): React.JSX.Element {
  return (
    <motion.div
      className="h-auto pb-[5vh] mt-[3vh] maxSe:mt-[13vh]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <section>
        {/* ヘッダー部分 */}
        <motion.div className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center' variants={fadeInUp}>
          <div className="flex items-center">
            <motion.div className="h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] mt-[-13vh] md:mt-[-18vh] lg:mt-[-19vh] xl:mt-[-30vh]" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            <motion.h1 className="[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl" variants={fadeInUp}>
              利用案内
            </motion.h1>
            <motion.div className="h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[13vh] md:mt-[18vh] lg:mt-[19vh] xl:mt-[30vh]" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          </div>
        </motion.div>

        <motion.div className="mt-[7vh] md:mt-[6vh] lg:mt-[5vh] xl:mt-[4vh] space-y-8" variants={staggerContainer}>
          {accessData.map((item, index) => (
            <motion.div
              key={index}
              className="text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 className="bg-[#5c554f] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300" whileHover={{ backgroundColor: "#403c37" }}>
                {item.title}
              </motion.h2>
              <motion.div
                className="text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {item.content}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* もっと見るボタン */}
        <Link href="/access" className="block w-full mt-[4vh] px-8">
          <motion.button
            className="bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji w-full max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto block py-3 md:py-4 xl:py-5 transition-all duration-300"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            もっと見る
          </motion.button>
        </Link>
      </section>
    </motion.div>
  );
}