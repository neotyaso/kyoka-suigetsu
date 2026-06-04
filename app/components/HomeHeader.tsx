"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from '@/types/index';
import Link from 'next/link';

const MotionLink = motion.create(Link);

// ナビゲーションメニューの共通データ
const menuItems: MenuItem[] = [
  { name: "見どころ", to: "/highlight" },
  { name: "歴史", to: "/story" },
  { name: "お知らせ", to: "/news" },
  { name: "利用案内", to: "/access" },
  { name: "アクセス", to: "/access" },
  { name: "お問い合わせ", to: "/contact" }
];

export default function HomeHeader(): React.JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
      /* トップの画像セクション */
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

          {/* デスクトップ用メニュー */}
          <motion.ul
            className='flex gap-3 lg:text-xl xl:text-2xl items-center lg:mr-[2vw] xl:mr-[2.5vw]'
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {menuItems.map((item, idx) => (
              <Link key={`${item.name}-${idx}`} href={item.to}>
                <motion.li
                  className='hidden lg:block py-2 px-2'
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.li>
              </Link>
            ))}
          </motion.ul>

          {/* ハンバーガーボタン */}
          <motion.button
            onClick={toggleMenu}
            className="fixed top-4 right-4 z-50 w-12 h-12 bg-white bg-opacity-70 md:bg-transparent rounded-full flex flex-col justify-center items-center space-y-1 hover:bg-opacity-90 md:hover:bg-transparent transition-all duration-300 lg:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 md:w-9 h-0.5 bg-[#5c554f]"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 md:w-9 h-0.5 bg-[#5c554f]"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 md:w-9 h-0.5 bg-[#5c554f]"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* モバイルメニューオーバーレイ */}
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

          {/* モバイルメニューパネル */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 md:w-100 bg-[#5c554f] shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="h-full flex flex-col">
              <motion.div
                className="flex justify-between mt-[4vh] mx-[3vw]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-white font-bold font-yuji text-2xl md:text-3xl text-center">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    鏡花水月城
                  </Link>
                </h2>
                <motion.button
                  className='text-white text-3xl md:text-4xl font-bold font-yuji mt-[-1vh] md:mt-0'
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

                <nav className="flex-1 space-y-2">
                  {menuItems.map((item, index) => (
                    <MotionLink
                      key={item.name}
                      href={item.to}
                      className="block px-4 py-3 text-white hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300 text-lg border-b border-gray-700 border-opacity-30"
                      onClick={() => setIsMenuOpen(false)}
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

        {/* メイン縦書きタイトル */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="font-bold font-yuji text-[#5c554f] [writing-mode:vertical-rl] mt-[10vh] md:mt-[16vh] lg:mt-[17vh] ml-[35.5vw] md:ml-[39vw] lg:ml-[42vw] xl:ml-[44vw] text-9xl maxSe:text-8xl md:text-[19vh] lg:text-[23vh] xl:text-[27vh] md:h-screen lg:h-[140vh] xl:h-[150vh]"
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
    )
}