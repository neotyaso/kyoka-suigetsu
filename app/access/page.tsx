"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import { InfoSectionProps, AccessMethod } from "@/types/index"; // 共通型をインポート

// アニメーション設定 (Variants)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const underlineVariants: Variants = {
  initial: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// 共通のセクションレイアウトコンポーネント
const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <motion.section className="py-8 md:py-12" variants={itemVariants}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* 見出し部分 */}
        <motion.h2
          className="inline-block text-xl md:text-3xl lg:text-4xl xl:text-5xl font-yuji text-center relative pb-2 cursor-pointer"
          whileHover="hover"
          initial="initial"
        >
          {title}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 origin-center"
            variants={underlineVariants}
          />
        </motion.h2>

        {/* コンテンツ部分 */}
        <div className="mt-6 font-yuji text-base md:text-xl lg:text-2xl xl:text-3xl text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

// アクセス方法のデータ（型を安全に割り当て）
const accessMethodsData: AccessMethod[] = [
  { label: "電車でお越しの場合", detail: "夢見駅から徒歩約15分" },
  { label: "バスでお越しの場合", detail: "夢見市内循環バス「白墨城前」下車すぐ" },
  { label: "お車でお越しの場合", detail: "白墨ICより約10分、駐車場あり" },
];

// メインコンポーネント
export default function Access(): React.JSX.Element {
  return (
    <AppLayout>
      {/* ⚠️ スタイル、余白、背景等は元のコードを完璧にキープしています */}
      <div className="bg-[url('/images/access/access_bg2.jpg')] bg-cover bg-fixed min-h-screen pb-16">
        {/* ヒーロー画像セクション */}
        <section className="relative bg-[url('/images/access/access_top.jpg')] bg-cover bg-center h-[30vh] md:h-[40vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 z-10" />
        </section>

        {/* ページタイトル */}
        <div className="text-center my-10 md:my-16">
          <motion.h1
            className="relative z-20 text-gray-800 text-2xl md:text-4xl lg:text-6xl font-yuji tracking-wider"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            ご利用案内・アクセス
          </motion.h1>
        </div>

        {/* 各案内セクション群 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <InfoSection title="開城時間">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              9:00〜17:00（最終入場 16:30）
            </motion.p>
          </InfoSection>

          <InfoSection title="所要時間目安">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              見学 約60〜90分
            </motion.p>
          </InfoSection>

          <InfoSection title="閉城期間">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              毎週火曜日（祝日の場合は翌日）
              <br />
              年末年始（12月29日〜1月3日）
            </motion.p>
          </InfoSection>

          <InfoSection title="入城料">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="space-y-1">
              一般：800円
              <br />
              高校生以下：400円
              <br />
              未就学児：無料
            </motion.p>
          </InfoSection>

          <InfoSection title="駐車場">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              あり（普通車30台／大型バス5台）
            </motion.p>
          </InfoSection>

          <InfoSection title="所在地">
            <motion.p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              〒000-0000 黒霞県 夢見郷 影之町一丁目 幽城台112番地
            </motion.p>
          </InfoSection>

          <InfoSection title="アクセス方法">
            <div className="max-w-md mx-auto space-y-4 text-left md:text-center">
              {accessMethodsData.map((item, index) => (
                <motion.p
                  key={index}
                  className="rounded-lg p-3 transition-colors"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(249, 250, 251, 0.6)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-semibold text-gray-900 block md:inline">{item.label}：</span>
                  <br className="hidden md:block" />
                  {item.detail}
                </motion.p>
              ))}
            </div>
          </InfoSection>
        </motion.div>
      </div>
    </AppLayout>
  );
}