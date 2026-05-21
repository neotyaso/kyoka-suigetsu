"use client"

import { motion, Variant, Variants } from 'framer-motion';
import AppLayout from '../components/AppLayout';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

const underlineVariants: Variants = {
  initial: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export default function Access() {
  return (
     <>
     <AppLayout>
      <div className="bg-[url('/images/access/access_bg2.jpg')] ">
        <section className="relative bg-[url('/images/access/access_top.jpg')] bg-cover bg-center h-[30vh] md:h-[35vh] lg:h-[45vh] xl:h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 z-10" />
        </section>
        <div className='text-center mt-[3vh] md:mt-[5vh] lg:mt-[6vh]'>
            <motion.h1
            className="relative z-20 text-gray-600 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-yuji"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            ご利用案内・アクセス
          </motion.h1>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji  text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  開城時間
                  <motion.div
                    className="block w-[14vw] md:w-[10vw] h-[0.2vh] lg:w-[9vw] lg:h-[0.2vh] xl:h-[0.2vh] xl:w-[8vw] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  9:00〜17:00（最終入場 16:30）
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  所有時間目安
                  <motion.div
                    className="block w-[25vw] h-[0.2vh] md:w-[15vw] md:h-[0.1vh] lg:h-[0.2vh] xl:w-[12vw] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  見学 約60〜90分
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  閉城期間
                  <motion.div
                    className="block w-[10vw] h-[0.3vh] md:w-[7vw] md:h-[0.2vh] lg:h-[0.2vh] xl:w-[6vw] xl:h-[0.3vh] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  毎週火曜日（祝日の場合は翌日）<br/>
                  年末年始（12月29日〜1月3日）
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  入城料
                  <motion.div
                    className="block w-[10vw] h-[0.3vh] md:w-[7vw] md:h-[0.2vh] xl:w-[6vw] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  一般：800円<br />高校生以下：400円<br/>未就学児：無料
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  駐車場
                  <motion.div
                    className="block w-[10vw] h-[0.3vh] md:w-[7vw] md:h-[0.2vh] lg:h-[0.2vh] xl:w-[6vw] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  あり（普通車30台／大型バス5台）
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  所在地
                  <motion.div
                    className="block w-[10vw] h-[0.3vh] md:w-[7vw] md:h-[0.2vh] xl:w-[6vw] xl:h-[0.3vh] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <motion.p
                  className="text-center text-gray-700 mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  〒000-0000 黒霞県 夢見郷 影之町一丁目 幽城台112番地
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section className="py-10" variants={itemVariants}>
            <div className="max-w-[900px] mx-auto px-4 grid gap-10">
              <div>
                <motion.h2
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-yuji text-center relative"
                  whileHover="hover"
                  initial="initial"
                >
                  アクセス方法
                  <motion.div
                    className="block w-[20vw] h-[0.3vh] md:w-[15vw] md:h-[0.2vh] xl:w-[12vw] bg-black mx-auto mt-2"
                    variants={underlineVariants}
                  />
                </motion.h2>
                <div className="mt-4 font-yuji text-lg md:text-xl lg:text-2xl xl:text-3xl text-center space-y-4">
                  <motion.p
                    className="rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-semibold ">電車でお越しの場合：</span><br />夢見駅から徒歩約15分
                  </motion.p>
                  <motion.p
                    className="rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-semibold">バスでお越しの場合：</span><br />夢見市内循環バス「白墨城前」下車すぐ
                  </motion.p>
                  <motion.p
                    className="rounded-lg p-2"
                    whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-semibold">お車でお越しの場合：</span><br />白墨ICより約10分、駐車場あり
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
      </AppLayout>
    </>
  )
}
