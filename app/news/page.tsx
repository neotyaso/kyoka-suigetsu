"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import AppLayout from '../components/AppLayout';
import { News as NewsType } from "@/types/index";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    }
  })
};

export default function News(): React.JSX.Element {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  // 画面が開いた瞬間に Hono (8000番) からデータを取ってくる
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('http://localhost:8000/api/admin/news');
        if (res.ok) {
          const data = await res.json();
          setNewsList(data);
        }
      } catch (error) {
        console.error("お知らせの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <AppLayout>
      <section className="bg-[url('/images/News/bg_sui.png')] bg-cover pb-[5vh]">
        <div className="relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh] xl:h-[64vh]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            src="/images/News/news_top.jpg"
            alt="鶴の画像"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/7 z-10" />
        </div>

        <h2 className="text-center font-bold font-yuji text-gray-700 mt-[4vh] xl:mt-[6vh] text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          お知らせ
        </h2>

        <div className="space-y-6 xl:space-y-10 mx-[4vw] mt-[5vh] xl:mt-[6vh] font-yuji">
          {loading ? (
            <p className="text-center text-gray-500 text-lg">お知らせを確認中...</p>
          ) : newsList.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">現在、お知らせはありません。</p>
          ) : (
            newsList.map((item, index) => (
              <motion.div
                key={item.id}
                className="p-[6vw] rounded-lg shadow-md bg-white/40"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
              >
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-[1vh]">
                  {new Date(item.createdAt || new Date()).toLocaleDateString('ja-JP')}
                </p>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-[2vh]">
                  {item.title}
                </h3>
                <p className="text-gray-700 lg:text-lg xl:text-xl whitespace-pre-wrap">
                  {item.content}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </AppLayout>
  );
}