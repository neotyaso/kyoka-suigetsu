"use client";

import { Variants } from "framer-motion";
import { easeInOut, motion } from "framer-motion";
import AppLayout from '../components/AppLayout';
import { News } from "@/types/index";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeOut",
        }
    })
}

const dummyNews: News[] = [
    {
        id: 1,
        title: "お知らせタイトル1",
        content: "お知らせの内容1",
        createdAt: "2024-01-01"
    }
];

export default function News({ newsList = dummyNews }: { newsList: News[] }) {
    return (
        <AppLayout>
            <section className="bg-[url('/images/News/bg_sui.png')] bg-cover pb-[5vh]">
                <div className="relative w-full h-[25vh] md:h-[35vh] lg:h-[45vh] xl:h-[64vh]">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, ease: easeInOut }}
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
                    {newsList.map((item, index) => (
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
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-[2vh]">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 lg:text-lg xl:text-xl">
                                {item.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </AppLayout>
    )
}