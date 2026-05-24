"use client";

import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {  motion, Variants } from "framer-motion";
import Link from 'next/link';
import { News } from '@/types/index';
const MotionLink = motion.create(Link);






export default function Home() {
  const latestNews: News[] = [
    { id: 1, title: "春の特別展示のお知らせ", content: "内容", createdAt: "2024-01-01" },
    { id: 2, title: "臨時休城のお知らせ", content: "内容", createdAt: "2024-01-02" },
    { id: 3, title: "新しいイベント情報", content: "内容", createdAt: "2024-01-03" },
  ]
    const itemVariants: Variants = {
      hidden: {opacity: 0, y: 20},
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

    const fadeInUp: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
      }
    }

    const slideInLeft: Variants = {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
      }
    }

    const slideInRight: Variants = {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
      }
    }

    const staggerContainer: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1
        }
      }
    }
      const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "見どころ", to: "/highlight" },
    { name: "歴史", to: "/history" },
    { name: "お知らせ", to: "/news" },
    { name: "利用案内", to: "/access" },
    { name: "アクセス", to: "/access" },
    { name: "お問い合わせ", to: "/contact" }
  ];
    return (
        <>
            {/* トップの画像 */}
    <div className="bg-[url('/images/Home/sumi_maho.jpg')] bg-center bg-cover h-[110vh] md:h-[150vh] lg:h-[190vh] xl:h-[230vh] relative">
      <motion.header
  className="fixed top-0 left-0 right-0 z-30 flex justify-between lg:font-bold font-yuji text-[#5c554f] bg-white shadow-md"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
    <Link href="/">
  <motion.h1
    className='md:text-4xl font-bold lg:text-4xl xl:text-6xl md:ml-[2vw] md:py-2 lg:py-2 lg:ml-[2vw] xl:ml-[3vw] hidden md:block'
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    >
    鏡花水月城
  </motion.h1>
      </Link>
  <motion.ul
    className='flex gap-3 lg:text-xl xl:text-2xl items-center lg:mr-[2vw] xl:mr-[2.5vw]'
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    <Link href="/highlight">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        見どころ
      </motion.li>
    </Link>
    <Link href="/history">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        歴史
      </motion.li>
    </Link>
    <Link href="/news">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        お知らせ
      </motion.li>
    </Link>
    <Link href="/access">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        利用案内
      </motion.li>
    </Link>
    <Link href="/access">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        アクセス
      </motion.li>
    </Link>
    <Link href="/contact">
      <motion.li
        className='hidden lg:block py-2 px-2'
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.2 }}
        >
        お問い合わせ
      </motion.li>
    </Link>
  </motion.ul>
  <motion.button
    onClick={toggleMenu}
    className="fixed top-4 right-4 z-50 w-12 h-12 bg-white bg-opacity-70 md:bg-transparent rounded-full flex flex-col justify-center items-center space-y-1 hover:bg-opacity-90 md:hover:bg-transparent transition-all duration-300 lg:hidden"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className={`w-6 md:w-9 h-0.5 bg-[#5c554f] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
      animate={{
        rotate: isMenuOpen ? 45 : 0,
        y: isMenuOpen ? 6 : 0
      }}
    />
    <motion.div
      className={`w-6 md:w-9 h-0.5 bg-[#5c554f] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
      animate={{ opacity: isMenuOpen ? 0 : 1 }}
    />
    <motion.div
      className={`w-6 md:w-9 h-0.5 bg-[#5c554f] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
      animate={{
        rotate: isMenuOpen ? -45 : 0,
        y: isMenuOpen ? -6 : 0
      }}
    />
  </motion.button>

  {/* オーバーレイ */}
  {isMenuOpen && (
    <motion.div
      className="fixed inset-0 bg-white bg-opacity-50 z-40"
      onClick={toggleMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )}

  {/* メニューパネル */}
  <motion.div
    className={`fixed top-0 right-0 h-full w-80 md:w-100 bg-[#5c554f] shadow-2xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
    initial={{ x: '100%' }}
    animate={{ x: isMenuOpen ? 0 : '100%' }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <div className="h-full flex flex-col">
    {/* メニュータイトル */}
    <motion.div
      className=" flex justify-between mt-[4vh] mx-[3vw] "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-white font-bold font-yuji text-2xl md:text-3xl text-center">
        <Link href="/">
          <div onClick={() => setIsMenuOpen(false)} >鏡花水月城</div>
        </Link>
      </h2>
      <motion.button
        className='text-white text-3xl md:text-4xl font-bold font-yuji -mt-[1vh] md:mt-0'
        onClick={() => setIsMenuOpen(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
    </motion.div>
    <div className='mt-[6vh]'>
      <motion.div
        className="w-full h-0.5 bg-white opacity-50 mt-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isMenuOpen ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {/* メニューアイテム */}
      <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => (
              <MotionLink
              key={item.name}
              href={item.to}
              className="block px-4 py-3 text-white hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300 text-lg border-b border-gray-700 border-opacity-30"
              onClick={toggleMenu}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : 50
              }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 10 }}
              >
              <span className="flex items-center justify-between">
                  {item.name}
                  <span className="text-white text-sm">›</span>
              </span>
              </MotionLink>
          ))}
          </nav>
    </div>
    </div>
  </motion.div>
</motion.header>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="font-bold font-yuji text-[#5c554f] [writing-mode:vertical-rl] mt-[10vh] md:mt-[16vh] lg:mt-[17vh] ml-[35.5vw] md:ml-[39vw] lg:ml-[42vw] xl:ml-[44vw]
        text-9xl maxSe:text-8xl md:text-[19vh] lg:text-[23vh] xl:text-[27vh] md:h-[100vh] lg:h-[140vh] xl:h-[150vh]"
          animate={{
            textShadow: [
              "0 0 0px rgba(92, 85, 79, 0.5)",
              "0 0 20px rgba(92, 85, 79, 0.3)",
              "0 0 0px rgba(92, 85, 79, 0.5)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          鏡花水月城
        </motion.h2>
      </motion.div>
    </div>
    {/* 時間案内 */}
    <motion.div
      className="text-center text-black font-bold font-yuji h-[30vh] md:h-[30vh] lg:h-[40vh] xl:h-[48vh] mt-[8vh] md:mt-[10vh] lg:mt-[12vh] xl:mt-[15vh]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h1
        className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
        variants={fadeInUp}
      >
        本日の開城時間
      </motion.h1>
      <motion.span
        className="block mx-auto w-[35vw] md:w-[23vw] lg:w-[21vw] xl:w-[19vw] h-[0.1vh] bg-black mt-[0.2vh] md:mt-[0.7vh] lg:mt-[1vh]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.h2
        className='text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-[1vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[4vh]'
        variants={fadeInUp}
      >
        9:00〜17:00
      </motion.h2>
      <motion.p
        className='text-sm md:text-base lg:text-lg xl:text-xl xl:mt-[0.5vh]'
        variants={fadeInUp}
      >
        (最終入場 16:30)
      </motion.p>
      <Link href="/access">
        <motion.button
          className='bg-[#5c554f] hover:bg-[#403c37] text-white mt-[1vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[4vh] px-8 md:px-10 lg:px-15 xl:px-20 py-2 md:py-3 lg:py-4 xl:py-5 transition-all duration-300'
          variants={fadeInUp}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          >
          入館料はこちら
        </motion.button>
      </Link>
    </motion.div>
    {/* 紹介文を書く */}
    <motion.div
      className='text-center h-[50vh]lg:mt-[12vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.img
        src="/images/Home/matsu.jpg"
        alt="竹のイラスト"
        variants={fadeInUp}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <motion.h1
        className='text-bold font-yuji text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
        variants={fadeInUp}
      >
        鏡花水月城とは
      </motion.h1>
      <motion.p
        className='font-yuji text-base md:text-lg lg:text-xl xl:text-xl mt-[2vh] md:mt-[3vh] lg:mt-[6vh] xl:mt-[8vh] mx-8 md:mx-10 lg:mx-31 xl:mx-50'
        variants={fadeInUp}
      >
        鏡花水月城──それは、現実と幻想の境界に浮かび上がる、静謐なる城。
        名の由来は「鏡に映る花、水に浮かぶ月」の如く、手に取れそうで決して触れることのできない美しさを意味しています。
        この城はかつて、戦の世を離れた一人の武将が、心の安寧を求めて築いたと伝えられています。
        訪れた者の心もまた、静かに整えられていきます。
        歴史書にはほとんど名を残していないにもかかわらず、
        人々の記憶の中でひそかに語り継がれてきたこの城は、
        まさに「存在しないことの美」を体現する場所なのかもしれません。
        </motion.p>
    </motion.div>
    {/* 見どころの紹介 */}
    <motion.div
      className=' h-[115vh] md:h-[145vh] lg:h-[160vh] xl:h-[190vh] mt-[3vh] xl:mt-[5vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.section
        className='relative h-[42vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]'
        variants={fadeInUp}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          <SwiperSlide>
            <motion.img
              src="/images/Highlight/sakura_siki.jpg"
              alt="春の城"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src="/images/Highlight/siro.jpg"
              alt="城"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src="/images/Highlight/momizi-2.jpg"
              alt="秋の城"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src="/images/Highlight/yuki.jpg"
              alt="冬の城"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </SwiperSlide>
        </Swiper>
      </motion.section>
      <section>
        <motion.div
          className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center mt-[4vh] md:mt-[5vh] lg:mt-[1vh] xl:mt-[10vh]'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className='flex items-center'>
            {/* 左の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] -mt-[25vh] md:-mt-[38vh] lg:-mt-[44vh] xl:-mt-[54vh]'
              variants={slideInLeft}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            {/* 縦書きタイトル */}
            <motion.h1
              className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
              variants={fadeInUp}
            >
              鏡花水月城の見どころ
            </motion.h1>
            {/* 右の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[25vh] md:mt-[38vh] lg:mt-[44vh] xl:mt-[54vh]'
              variants={slideInRight}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
          className='mt-[5vh] md:mt-[6vh] lg:mt-[5vh] xl:mt-[4vh]'
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className='text-bold font-yuji text-base md:text-lg lg:text-xl xl:text-2xl mx-8 md:mx-16 lg:mx-20 xl:mx-24'
            variants={fadeInUp}
          >
            鏡花水月城は、四季の移ろいとともに姿を変える美の城。
            春には桜が城を淡く包み、夏は深緑と共に清らかな風が吹く。
            秋は紅葉が石垣を染め、冬は静寂の雪が幻想を映す。
            一年を通して、自然が織りなす色彩の物語がここにある。
          </motion.p>
        </motion.div>
        <Link href="/highlight">
          <motion.button
            className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji  lg:ml-[8vw] xl:ml-[7vw] mt-[1.8vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[3vh] px-[32vw] mx-8 md:px-[37vw] md:mx-16 lg:px-[38.7vw] xl:px-[40.7vw] py-3 md:py-3 lg:py-4 xl:py-5 transition-all duration-300'
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            >
            もっと見る
          </motion.button>
        </Link>
      </section>
    </motion.div>
    {/* 歴史の紹介 */}
    <motion.div
      className='h-[95vh] md:h-[90vh] lg:h-[102vh] xl:h-[120vh] mt-[3vh] maxSe:mt-[13vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <section>
        <motion.div
          className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center'
          variants={fadeInUp}
        >
          <div className='flex items-center'>
            {/* 左の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] -mt-[25vh] md:-mt-[28vh] lg:-mt-[42vh] xl:-mt-[54vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            {/* 縦書きタイトル */}
            <motion.h1
              className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
              variants={fadeInUp}
            >
              鏡花水月城の歴史
            </motion.h1>
            {/* 右の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[25vh] md:mt-[28vh] lg:mt-[42vh] xl:mt-[54vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
          className='mt-[5vh] md:mt-[6vh] lg:mt-[5vh] xl:mt-[4vh]'
          variants={fadeInUp}
        >
          <motion.p
            className='text-bold font-yuji text-base md:text-lg lg:text-xl xl:text-2xl mx-8 md:mx-16 lg:mx-20 xl:mx-24'
            variants={fadeInUp}
          >
            白墨に浮かぶ幻の城――鏡花水月城。その起源は、遥か戦国の世にまで遡る。
            記録によれば、この城は、争いを嫌い、自然と共に静かに生きることを望んだ一人の隠者により築かれたとされる。戦の時代にあって異端とされたその思想は、やがて民の心を動かし、争いの絶えぬ地に一時の安らぎをもたらした。
            墨一滴、筆一線に込められた祈りと願い。虚霞水月城は、戦の喧騒から離れ、心の平穏を求めた者たちが集う場所として静かにその姿を残し続けてきた。
            今ではその存在さえも伝説とされているが、墨画として描かれたその姿には、確かに時代を超えた記憶が息づいている。
          </motion.p>
        </motion.div>
        <Link href="/history">
          <motion.button
            className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji   mt-[1.8vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[3vh] px-[32vw] mx-8 md:px-[37vw] md:mx-16 lg:px-[38.7vw] xl:px-[40vw] xl:mx-24 py-3 md:py-3 lg:py-4 xl:py-5 transition-all duration-300'
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            >
            もっと見る
          </motion.button>
        </Link>
      </section>
    </motion.div>
    {/* お知らせ*/}
    <motion.div
      className='h-[80vh] md:h-[85vh] lg:h-[98vh] xl:h-[115vh] mt-[2vh] maxSe:mt-[13vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <section>
        <motion.div
          className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center'
          variants={fadeInUp}
        >
          <div className='flex items-center'>
            {/* 左の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] -mt-[17vh] md:-mt-[18vh] lg:-mt-[20vh] xl:-mt-[28vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            {/* 縦書きタイトル */}
            <motion.h1
              className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
              variants={fadeInUp}
            >
              お知らせ
            </motion.h1>
            {/* 右の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[18vh] md:mt-[15vh] lg:mt-[20vh] xl:mt-[28vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
  className="space-y-6 xl:space-y-10 mx-[4vw] mt-[5vh] xl:mt-[6vh]"
  variants={staggerContainer}
>
  {latestNews.map((item, index) => (
    <motion.div
      key={item.id}
      className="px-[5vw] py-[0.1vh] font-yuji border-t border-black cursor-pointer"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.3}}
      variants={itemVariants}
      whileHover={{
        x: 10,
        backgroundColor: "rgba(92, 85, 79, 0.05)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.p
        className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-[1vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {new Date(item.createdAt).toLocaleDateString('ja-JP')}
      </motion.p>
      <motion.h3
        className="text-base lg:text-2xl xl:text-3xl font-semibold mb-[2vh]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.1 }}
      >
        {item.title}
      </motion.h3>
    </motion.div>
  ))}
  <motion.span
    className="block mx-auto w-[91vw] md:w-[92.9vw] lg:w-[93vw] xl:w-[94vw] h-[0.1vh] bg-black mt-[0.7vh]"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  />
</motion.div>

        <Link href="/news">
          <motion.button
            className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji    mt-[1.8vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[3vh] px-[32vw] mx-8 md:px-[37vw] md:mx-16 lg:px-[40vw] xl:px-[41vw] xl:mx-24 py-3 md:py-3 lg:py-4 xl:py-5 transition-all duration-300'
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            >
            もっと見る
          </motion.button>
        </Link>
      </section>
    </motion.div>
    {/* 利用案内 */}
    <motion.div
      className='h-[175vh] md:h-[185vh] lg:h-[230vh] xl:h-[270vh] mt-[3vh] maxSe:mt-[13vh]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <section>
        <motion.div
          className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center'
          variants={fadeInUp}
        >
          <div className='flex items-center'>
            {/* 左の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] -mt-[13vh] md:-mt-[18vh] lg:-mt-[19vh] xl:-mt-[30vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            {/* 縦書きタイトル */}
            <motion.h1
              className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
              variants={fadeInUp}
            >
              利用案内
            </motion.h1>
            {/* 右の縦線 */}
            <motion.div
              className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[13vh] md:mt-[18vh] lg:mt-[19vh] xl:mt-[30vh]'
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
          className='mt-[7vh] md:mt-[6vh] lg:mt-[5vh] xl:mt-[4vh] space-y-8'
          variants={staggerContainer}
        >
          {/* 開場時間 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                開城時間
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p>開城時間</p>
              <p>9:00〜17:00（最終入場 16:30）</p>
            </motion.div>
          </motion.div>
          {/* 閉場日 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                閉城時間
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>毎週火曜日（祝日の場合は翌日）</p>
              <p>年末年始（12月29日〜1月3日）</p>
            </motion.div>
          </motion.div>
          {/* 見学時間 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                所要時間目安
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p>見学 約60〜90分</p>
            </motion.div>
          </motion.div>
          {/* 駐車場*/}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                駐車場
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p>あり（普通車30台／大型バス5台）</p>
            </motion.div>
          </motion.div>
          {/* 入場料 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                入場料
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p>一般：800円</p>
              <p>高校生以下：400円</p>
              <p>未就学児：無料</p>
            </motion.div>
          </motion.div>
          {/* 所在地 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                所在地
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p>〒000-0000</p>
              <p>黒霞県 夢見郷 影之町一丁目</p>
              <p>幽城台112番地</p>
            </motion.div>
          </motion.div>
          {/* アクセス方法 */}
          <motion.div
            className='text-center font-bold font-yuji px-[4vw] lg:px-[2.8vw] xl:px-[2.4vw] lg:text-xl xl:text-2xl'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
              <motion.h2
                className='bg-[#5c554f] hover:bg-[#403c37] text-white py-[1vh] lg:py-[2vh] xl:py-[3vh] transition-colors duration-300'
                whileHover={{ backgroundColor: "#403c37" }}
              >
                アクセス方法
              </motion.h2>
            <motion.div
              className='text-black py-[2vh] lg:py-[3vh] xl:py-[4vh] lg:text-lg xl:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <p>電車でお越しの場合</p>
              <p className='border-b-1'>夢見駅から徒歩約15分</p>
              <p>バスでお越しの場合</p>
              <p className='border-b-1'>夢見市内循環バス「白墨城前」下車すぐ</p>
              <p>お車でお越しの場合</p>
              <p>白墨ICより約10分、駐車場あり</p>
            </motion.div>
          </motion.div>
        </motion.div>
        <Link href="/access">
          <motion.button
            className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji mt-[1.8vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[3vh] px-[32vw] mx-8 md:px-[42.5vw] lg:px-[38vw] lg:mx-20 xl:px-[40vw] xl:mx-24 py-3 md:py-3 lg:py-4 xl:py-5 transition-all duration-300'
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            >
            もっと見る
          </motion.button>
        </Link>
      </section>
    </motion.div>
<motion.footer
      className="bg-[#5c554f] text-white h-[30vh] mt-[5vh] maxSe:mt-[35vh]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className='font-bold font-yuji'>
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl pt-[2vh]"
            variants={fadeInUp}
          >
            鏡花水月城
          </motion.h2>
          <motion.p
            className="text-lg pt-[1vh] xl:pt-[2vh]"
            variants={fadeInUp}
          >
            現実と幻想の境界に浮かぶ、静謐なる城
          </motion.p>
          <motion.div
            className="flex justify-center space-x-8 text-sm pt-[3vh] xl:pt-[4vh]"
            variants={fadeInUp}
          >
            <motion.div
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              プライバシーポリシー
            </motion.div>
            <Link href="/access">
                <motion.div
                className="hover:text-gray-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                >
                利用規約
                </motion.div>
            </Link>
            <Link href="/contact">
                <motion.div
                className="hover:text-gray-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                >
                お問い合わせ
                </motion.div>
            </Link>
          </motion.div>
          <motion.div
            className="mt-8 pt-8 border-t border-gray-600 text-center text-sm"
            variants={fadeInUp}
          >
            <p>&copy; 2025 鏡花水月城. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>


</>
    );
}