"use client";

import Link from 'next/link';
import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from '../constants/animations';

export default function HistorySection(): React.JSX.Element {
    return (
        <motion.div
                className='h-auto pb-[5vh] mt-[3vh] maxSe:mt-[13vh]'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
        >
        <section>
          <motion.div className='bg-[url("/images/Home/take.jpg")] bg-cover bg-center flex justify-center' variants={fadeInUp}>
            <div className='flex items-center'>
              <motion.div className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black mr-[4vw] mt-[-25vh] md:mt-[-28vh] lg:mt-[-42vh] xl:mt-[-54vh]' initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
              <motion.h1 className='[writing-mode:vertical-rl] font-yuji font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl' variants={fadeInUp}>
                鏡花水月城の歴史
              </motion.h1>
              <motion.div className='h-[10vh] md:h-[12.5vh] lg:h-[14vh] w-px bg-black ml-[4vw] mt-[25vh] md:mt-[38vh] lg:mt-[44vh] xl:mt-[54vh]' initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            </div>
          </motion.div>

          <motion.div className='mt-[5vh] md:mt-[6vh] lg:mt-[5vh] xl:mt-[4vh]' variants={fadeInUp}>
            <motion.p className='text-bold font-yuji text-base md:text-lg lg:text-xl xl:text-2xl mx-8 md:mx-16 lg:mx-20 xl:mx-24' variants={fadeInUp}>
              白墨に浮かぶ幻 of 城――鏡花水月城。その起源は、遥か戦国の世にまで遡る。<br />
              記録によれば、この城は、争いを嫌い、自然と共に静かに生きることを望んだ一人の隠者により築かれたとされる。戦の時代にあって異端とされたその思想は、やがて民の心を動かし、争いの絶えぬ地に一時の安らぎをもたらした。<br />
              墨一滴、筆一線に込められた祈りと願い。虚霞水月城は、戦の喧騒から離れ、心の平穏を求めた者たちが集う場所として静かにその姿を残し続けてきた。<br />
              今ではその存在さえも伝説とされているが、墨画として描かれたその姿には、確かに時代を超えた記憶が息づいている。
            </motion.p>
          </motion.div>

          {/* もっと見るボタン */}
          <Link href="/story" className="block w-full mt-[4vh] px-8">
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

