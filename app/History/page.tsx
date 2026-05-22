"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AppLayout from '../components/AppLayout';


const AnimatedDiv = ({ children, className = "", delay = 0, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

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
  )
}

const AnimatedLine = ({ delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative mt-[1vh]">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[0.1vw] h-[9vh] bg-black origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  )
}

export default function History() {
    return (
        <AppLayout>
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 4, ease: "easeInOut"}}
    className="bg-[url('/images/History/combined_left_right.png')]
    md:bg-[url('/images/History/bg_maho.png')] md:bg-[position:center_15vh]
    lg:bg-[url('/images/History/bg_maho2.jpg')] lg:bg-[position:center_20vh]
    xl:bg-[position:center_65vh]">
      <section>
        <motion.img
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2.5, ease: "easeInOut"}}
        src="/images/History/siro_sui.png" alt="城の水墨画"
        className='h-[23vh] w-full md:h-[40vh] lg:h-[55vh] xl:h-[75vh]' />
        <div className='flex flex-row justify-end mt-[4vh] mr-[6vw] gap-4'>
          <motion.p
          initial={{opacity: 0, x: 30}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 1.5, delay: 1}}
          className='[writing-mode:vertical-rl] text-sm md:text-base lg:text-lg xl:text-xl mt-[2vh] md:mt-[3vh] lg:mt-[4vh] xl:mt-[5vh] font-bold font-yuji '>
            墨一滴が刻む、武士たちの足跡。<br/>
            その静けさの奥に、炎の時代が見える。<br/>
            名もなき兵が刀を振るい、<br/>
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
          <motion.h3
          initial={{opacity: 0, x: 30}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 1.5, delay: 1.2}}
          className='[writing-mode:vertical-rl] text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-yuji'>
            白墨に浮かぶ戦国の記憶
          </motion.h3>
        </div>
      </section>
      <section>
        <div>
        <AnimatedDiv delay={0.1}>
        <h2 className='font-yuji font-bold text-center text-2xl lg:text-3xl xl:text-4xl  mt-[2vh]'>鏡花水月城の歴史</h2>
        <div className="w-[33vw] md:w-[20vw] xl:w-[16vw] mx-auto border-b-1 border-black mt-3"></div>
        </AnimatedDiv>
        </div>
      </section>
      <section >
        <div className=' pb-[5vh]'>
          <AnimatedDiv delay={0.2}>
            <h2 className='text-center font-yuji font-bold text-xl lg:text-2xl xl:text-3xl mt-[3vh]'>平安時代</h2>
            <span className="block mx-auto w-[17vw] md:w-[8vw] lg:w-[7vw] xl:w-[5vw] h-[0.1vh] bg-black mt-[0.7vh]" />
          </AnimatedDiv>
            <AnimatedLine delay={0.3} />
              <AnimatedDiv delay={0.4}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>保元元年  (1156年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'><span className='text-black'>桜谷の丘に小規模な館を構えた</span>地方豪族の桜井氏が<span className='text-black'>初代城主となる。当時は「桜井館」と</span>呼ばれて<span className='text-black'>いた。</span></p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={0.5} />
              <AnimatedDiv delay={0.6}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>文治5年  (1189年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>鎌倉に新たな武家政権が成立。桜井氏が新政権に恭順を示し、領地安堵を受ける。</p>
              </div>
            </AnimatedDiv>
              <AnimatedDiv delay={0.7}>
                <h2 className='text-center font-yuji font-bold text-xl lg:text-2xl xl:text-3xl mt-[3vh]'>鎌倉・室町時代</h2>
                <span className="block mx-auto w-[30vw] md:w-[14vw] xl:w-[12vw] h-[0.1vh] bg-black mt-[0.7vh]" />
              </AnimatedDiv>
              <AnimatedLine delay={0.8} />
                <AnimatedDiv delay={0.9}>
                  <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>正慶2年  (1333年)</div>
                  <div>
                    <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>政権交代に伴い、朝廷より「鏡花水月城」の名を賜る。城名の由来は、春になると城を囲む桜が湖面に映る美しい光景から。</p>
                  </div>
                </AnimatedDiv>
              <AnimatedLine delay={1.0} />
                <AnimatedDiv delay={1.1}>
                  <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>応仁元年  (1467年)</div>
                  <div>
                    <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>全国的な内乱の中、城の防備を強化。本格的な石垣と堀の建設が始まる。</p>
                  </div>
                </AnimatedDiv>
              <AnimatedLine delay={1.2} />
                <AnimatedDiv delay={1.3}>
                    <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>天正元年  (1573年)</div>
                    <div>
                      <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>中央の統一政権の勢力拡大に際し、桜井氏は恭順を示す。城の大規模な改築を開始。</p>
                    </div>
                </AnimatedDiv>
              <AnimatedDiv delay={1.4}>
                <h2 className='text-center font-yuji font-bold text-xl lg:text-2xl xl:text-3xl mt-[3vh]'>安土桃山時代</h2>
                <span className="block mx-auto w-[26vw] md:w-[12vw] xl:w-[10vw] h-[0.1vh] bg-black mt-[0.7vh]" />
              </AnimatedDiv>
              <AnimatedLine delay={1.5} />
                <AnimatedDiv delay={1.6}>
                  <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>天正10年  (1582年)</div>
                  <div>
                  <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>政情不安の中、桜井氏は新たな権力者に仕える。城郭の近世化が進む。</p>
                  </div>
                </AnimatedDiv>
              <AnimatedLine delay={1.7} />
                <AnimatedDiv delay={1.8}>
                  <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>天正18年  (1590年)</div>
                  <div>
                  <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 md:text-black mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>全国統一後、桜井氏は所領を安堵される。天守閣の建設に着手。</p>
                </div>
              </AnimatedDiv>
              <AnimatedLine delay={1.9} />
                <AnimatedDiv delay={2.0}>
                  <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>慶長3年  (1598年)</div>
                  <div>
                  <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>現在の天守閣が完成。桜の季節に合わせた独特の曲線美を持つ建築様式で、「桜天守」と称される。</p>
                </div>
              </AnimatedDiv>
            <AnimatedDiv delay={2.1}>
              <h2 className='text-center font-yuji font-bold text-xl lg:text-2xl xl:text-3xl mt-[3vh]'>江戸時代</h2>
              <span className="block mx-auto w-[15vw] md:w-[7vw] xl:w-[6vw] h-[0.1vh] bg-black mt-[0.7vh]" />
            </AnimatedDiv>
            <AnimatedLine delay={2.2} />
              <AnimatedDiv delay={2.3}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>慶長5年  (1600年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>全国的な戦乱で桜井氏は勝利側に参加。戦後、新政権より所領を安堵され、3万石の大名として存続。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={2.4} />
              <AnimatedDiv delay={2.5}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>明暦3年  (1657年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>江戸の大火災の際、復興資材として城下の桜材を献上。この功績により将軍家から感状を受ける。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={2.6} />
              <AnimatedDiv delay={2.7}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>享保元年  (1716年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-black md:text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>政改革に協力。城内に桜の品種改良を行う「御桜園」を設置。</p>
              </div>
            </AnimatedDiv>

            <AnimatedDiv delay={2.8}>
              <h2 className='text-center font-yuji font-bold text-xl lg:text-2xl xl:text-3xl mt-[3vh]'>近現代</h2>
              <span className="block mx-auto w-[10vw] md:w-[6vw] lg:w-[5vw] xl:w-[4vw] h-[0.1vh] bg-black mt-[0.7vh]" />
            </AnimatedDiv>
            <AnimatedLine delay={2.9} />
              <AnimatedDiv delay={3.0}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>明治元年  (1868年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 lg:text-black mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>明治維新により桜井氏は版籍奉還。城は新政府に接収されるが、地元住民の嘆願により保存が決定。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={3.1} />
              <AnimatedDiv delay={3.2}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>大正後期  (1920年代)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>大規模な地震により一部損壊するも、地域住民の協力により復旧。この際、近代的な補強技術が用いられる。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={3.3} />
              <AnimatedDiv delay={3.4}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>昭和中期  (1940年代)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>戦時中も地域の象徴として大切に保護され、戦災を免れる。戦後復興期には地域再生の拠点となる。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={3.5} />
              <AnimatedDiv delay={3.6}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>昭和27年  (1952年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>国の重要文化財に指定。本格的な修復事業が開始される。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={3.7} />
              <AnimatedDiv delay={3.8}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>昭和51年  (1976年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>城址公園として整備完了。桜の名所として年間50万人の観光客が訪れるようになる。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={3.9} />
              <AnimatedDiv delay={4.0}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>平成初期  (1990年代)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>文化財保護技術の向上に伴い、最新の保存技術を用いた補強工事を実施。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={4.1} />
              <AnimatedDiv delay={4.2}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>平成31年/令和元年  (2019年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>改元記念として「令和桜」100本を城内に植樹。新時代への希望を象徴する事業として注目を集める。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={4.3} />
              <AnimatedDiv delay={4.4}>
                <div className='text-center font-yuji font-bold text-lg lg:text-xl xl:text-2xl tracking-wide mt-[11vh] '>令和6年  (2024年)</div>
                <div>
                <p className='leading-relaxed font-bold font-yuji text-sm lg:text-base xl:text-lg text-gray-700 lg:text-black mt-[1vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>デジタル技術を活用した新しい展示システムを導入。最新技術で江戸時代の城下町を体験できる施設をオープン。</p>
              </div>
            </AnimatedDiv>
            <AnimatedLine delay={4.5} />
                <AnimatedDiv delay={4.6}>
                  <p className='text-center font-yuji font-bold text-base lg:text-lg xl:text-xl text-gray-700 mt-[11vh] mx-[8vw] md:mx-[12vw] lg:mx-[14vw] xl:mx-[20vw]'>鏡花水月城は現在も春になると約3000本の桜が咲き誇り、地域を代表する桜の名所として多くの人々に愛され続けている。</p>
                </AnimatedDiv>
        </div>
      </section>
    </motion.div>
    </AppLayout>
  )
}