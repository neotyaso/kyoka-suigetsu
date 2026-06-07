"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link'; 
import {itemVariants, fadeInUp, staggerContainer} from '../constants/animations';

export default function HomeNews(): React.JSX.Element {
  const [latestNews, setLatestNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHomeNews() {
      try {
        const res = await fetch('/api/admin/news');
        if (res.ok) {
          const allNews = await res.json();
          // 最新の3件だけを切り取ってセット
          setLatestNews(allNews.slice(0, 3));
        }
      } catch (error) {
        console.error("ホーム用お知らせの取得に失敗しました:", error);
      }
    }
    fetchHomeNews();
  }, []);

  return (
    <motion.div
      className='h-auto pb-[5vh] mt-[2vh] maxSe:mt-[13vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <section>
        <motion.div className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center' variants={fadeInUp}>
          <div className='flex items-center'>
            <motion.div className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] mt-[-17vh] md:mt-[-18vh] lg:mt-[-20vh] xl:mt-[-28vh]' initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            <motion.h1 className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl' variants={fadeInUp}>
              お知らせ
            </motion.h1>
            <motion.div className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[18vh] md:mt-[15vh] lg:mt-[20vh] xl:mt-[28vh]' initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          </div>
        </motion.div>

        <motion.div className="space-y-6 xl:space-y-10 mx-[4vw] mt-[5vh] xl:mt-[6vh]" variants={staggerContainer}>
          {latestNews.length === 0 ? (
            <p className="text-center text-gray-500 font-yuji text-sm md:text-base py-4">現在、新しい布告はありません。</p>
          ) : (
            latestNews.map((item, index) => (
              <motion.div
                key={item.id}
                className="px-[5vw] py-[0.1vh] font-yuji border-t border-black cursor-pointer"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
                whileHover={{
                  x: 10,
                  backgroundColor: "rgba(92, 85, 79, 0.05)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-[1vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  {new Date(item.date || item.createdAt || new Date()).toLocaleDateString('ja-JP')}
                </motion.p>
                <motion.h3 className="text-base lg:text-2xl xl:text-3xl font-semibold mb-[2vh]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.1 }}>
                  {item.title}
                </motion.h3>
              </motion.div>
            ))
          )}
          <motion.span className="block mx-auto w-[91vw] md:w-[92.9vw] lg:w-[93vw] xl:w-[94vw] h-[0.1vh] bg-black mt-[0.7vh]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </motion.div>

        {/*もっと見るボタン */}
        <Link href="/news" className="block w-full mt-[4vh] px-8">
          <motion.button
            className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji w-full max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto block py-3 md:py-4 xl:py-5 transition-all duration-300'
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