"use client";

import React, { useRef } from 'react';
import { motion, useInView, MotionProps } from 'framer-motion';
import AppLayout from '../components/AppLayout';

interface AnimatedProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface TimelineItem {
  yearEra: string;   
  yearWestern: string;
  text: string;      
  isHighlight?: boolean; 
}

interface EraSection {
  eraName: string; 
  items: TimelineItem[];
}

const historyData: EraSection[] = [
  {
    eraName: "平安時代",
    items: [
      {
        yearEra: "保元元年",
        yearWestern: "（1156年）",
        text: "桜谷の丘に小規模な館を構えた地方豪族の桜井氏が初代城主となる。当時は「桜井館」と呼ばれていた。",
      },
      {
        yearEra: "文治5年",
        yearWestern: "（1189年）",
        text: "鎌倉に新たな武家政権が成立。桜井氏が新政権に恭順を示し、領地安堵を受ける。",
      },
    ],
  },
  {
    eraName: "鎌倉・室町時代",
    items: [
      {
        yearEra: "正慶2年",
        yearWestern: "（1333年）",
        text: "政権交代に伴い、朝廷より「鏡花水月城」の名を賜る。城名の由来は、春になると城を囲む桜が湖面に映る美しい光景から。",
      },
      {
        yearEra: "応仁元年",
        yearWestern: "（1467年）",
        text: "全国的な内乱の中、城の防備を強化。本格的な石垣と堀の建設が始まる。",
      },
      {
        yearEra: "天正元年",
        yearWestern: "（1573年）",
        text: "中央の統一政権の勢力拡大に際し、桜井氏は恭順を示す。城の大規模な改築を開始。",
      },
    ],
  },
  {
    eraName: "安土桃山時代",
    items: [
      {
        yearEra: "天正10年",
        yearWestern: "（1582年）",
        text: "政情不安の中、桜井氏は新たな権力者に仕える。城郭の近世化が進む。",
      },
      {
        yearEra: "天正18年",
        yearWestern: "（1590年）",
        text: "全国統一後、桜井氏は所領を安堵される。天守閣の建設に着手。",
      },
      {
        yearEra: "慶長3年",
        yearWestern: "（1598年）",
        text: "現在の天守閣が完成。桜の季節に合わせた独特の曲線美を持つ建築様式で、「桜天守」と称される。",
      },
    ],
  },
  {
    eraName: "江戸時代",
    items: [
      {
        yearEra: "慶長5年",
        yearWestern: "（1600年）",
        text: "全国的な戦乱で桜井氏は勝利側に参加。戦後、新政権より所領を安堵され、3万石の大名として存続。",
      },
      {
        yearEra: "明暦3年",
        yearWestern: "（1657年）",
        text: "江戸の大火災の際、復興資材として城下の桜材を献上。この功績により将軍家から感状を受ける。",
      },
      {
        yearEra: "享保元年",
        yearWestern: "（1716年）",
        text: "財政改革に協力。城内に桜の品種改良を行う「御桜園」を設置。",
      },
    ],
  },
  {
    eraName: "近現代",
    items: [
      {
        yearEra: "明治元年",
        yearWestern: "（1868年）",
        text: "明治維新により桜井氏は版籍奉還。城は新政府に接収されるが、地元住民の嘆願により保存が決定。",
      },
      {
        yearEra: "大正後期",
        yearWestern: "（1920年代）",
        text: "大規模な地震により一部損壊するも、地域住民の協力により復旧。この際、近代的な補強技術が用いられる。",
      },
      {
        yearEra: "昭和中期",
        yearWestern: "（1940年代）",
        text: "戦時中も地域の象徴として大切に保護され、戦災を免れる。戦後復興期には地域再生の拠点となる。",
      },
      {
        yearEra: "昭和27年",
        yearWestern: "（1952年）",
        text: "国の重要文化財に指定。本格的な修復事業が開始される。",
      },
      {
        yearEra: "昭和51年",
        yearWestern: "（1976年）",
        text: "城址公園として整備完了。桜の名所として年間50万人の観光客が訪れるようになる。",
      },
      {
        yearEra: "平成初期",
        yearWestern: "（1990年代）",
        text: "文化財保護技術の向上に伴い、最新の保存技術を用いた補強工事を実施。",
      },
      {
        yearEra: "平成31年/令和元年",
        yearWestern: "（2019年）",
        text: "改元記念として「令和桜」100本を城内に植樹。新時代への希望を象徴する事業として注目を集める。",
      },
      {
        yearEra: "令和6年",
        yearWestern: "（2024年）",
        text: "デジタル技術を活用した新しい展示システムを導入。最新技術で江戸時代の城下町を体験できる施設をオープン。",
      },
    ],
  },
];

const AnimatedDiv: React.FC<AnimatedProps> = ({ children, className = "", delay = 0, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedLine: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative h-20 my-4">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gray-800 origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      />
    </div>
  );
};

export default function Story(): React.JSX.Element {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="bg-[url('/images/history/combined_left_right.png')] md:bg-[url('/images/history/bg_maho.png')] lg:bg-[url('/images/history/bg_maho2.jpg')] bg-cover bg-center bg-fixed min-h-screen text-gray-800 pb-20"
      >
        {/* ヒーローイメージ ＆ 縦書きポエム */}
        <section className="relative w-full overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            src="/images/history/siro_sui.png"
            alt="城の水墨画"
            className="h-[30vh] w-full md:h-[50vh] lg:h-[65vh] xl:h-[75vh] object-cover"
          />
          
          <div className="flex flex-row-reverse justify-start mt-8 mr-[6vw] gap-6 md:gap-10">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="[writing-mode:vertical-rl] text-xl md:text-3xl lg:text-3xl xl:text-4xl font-bold font-yuji tracking-widest leading-none"
            >
              白墨に浮かぶ戦国の記憶
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="[writing-mode:vertical-rl] text-xs md:text-base lg:text-base xl:text-lg font-semibold font-yuji leading-relaxed tracking-wider h-[50vh] md:h-[40vh] overflow-visible"
            >
              墨一滴が刻む、武士たちの足跡。<br />
              その静けさの奥に、炎の時代が見える。<br />
              名もなき兵が刀を振るい、<br />
              誇りを胸に命を燃やした。<br />
              風に舞う桜が血を包み、<br />
              大地は静かにすべてを飲み込む。<br />
              勝者の影に敗者の願い、<br />
              叫びも祈りも城が知る。<br />
              白と黒の墨が語りかける、<br />
              誰もが生きた、確かな記憶。<br />
              時を越え、今もなおここに、<br />
              戦国の息吹が響いている。
            </motion.p>
          </div>
        </section>

        {/* ページ大タイトル */}
        <section className="mt-20 my-12">
          <AnimatedDiv delay={0.1}>
            <h2 className="font-yuji font-bold text-center text-2xl md:text-3xl lg:text-3xl xl:text-5xl">
              鏡花水月城の歴史
            </h2>
            <div className="w-24 md:w-36 mx-auto border-b-2 border-gray-800 mt-4" />
          </AnimatedDiv>
        </section>

        {/* メインタイムラインループ */}
        <section className="max-w-3xl mx-auto px-6">
          {historyData.map((section, sIdx) => (
            <div key={sIdx} className="mt-12">
              {/* 時代タイトル */}
              <AnimatedDiv delay={0.1} className="text-center">
                <h2 className="inline-block font-yuji font-bold text-xl md:text-2xl  xl:text-4xl relative pb-2">
                  {section.eraName}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800" />
                </h2>
              </AnimatedDiv>

              {/* 時代に属する各年表データ */}
              {section.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <AnimatedLine delay={0.1} />

                  <AnimatedDiv delay={0.15} className="text-center max-w-xl mx-auto">
                    {/* 年号表示 */}
                    <div className="font-yuji font-bold text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide text-gray-900">
                      {item.yearEra} <span className="text-sm font-semibold md:text-base  text-gray-500 ml-1">{item.yearWestern}</span>
                    </div>
                    {/* 本文 */}
                    <p className="font-yuji text-sm lg:text-base xl:text-lg text-gray-600 mt-4 leading-relaxed text-left md:text-center px-4">
                      {item.text}
                    </p>
                  </AnimatedDiv>
                </div>
              ))}
            </div>
          ))}

          {/* 年表最後のまとめテキスト */}
          <AnimatedLine delay={0.1} />
          <AnimatedDiv delay={0.2} className="max-w-xl mx-auto text-center mt-6">
            <p className="font-yuji font-bold text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed px-4">
              鏡花水月城は現在も春になると約3000本の桜が咲き誇り、地域を代表する桜の名所として多くの人々に愛され続けている。
            </p>
          </AnimatedDiv>
        </section>
      </motion.div>
    </AppLayout>
  );
}