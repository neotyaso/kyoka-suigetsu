"use client";

import Link from 'next/link';
import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from '../constants/animations';

export default function OpeningHours(): React.JSX.Element {
    return (
        <motion.div
                className="text-center text-black font-bold font-yuji h-[30vh] md:h-[30vh] lg:h-[40vh] xl:h-[48vh] mt-[8vh] md:mt-[10vh] lg:mt-[12vh] xl:mt-[15vh]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
         >
        <motion.h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl' variants={fadeInUp}>
            本日の開城時間
        </motion.h1>
        <motion.span
          className="block mx-auto w-[35vw] md:w-[23vw] lg:w-[21vw] xl:w-[19vw] h-[0.1vh] bg-black mt-[0.2vh] md:mt-[0.7vh] lg:mt-[1vh]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.h2 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-[1vh] md:mt-[2vh] lg:mt-[3vh] xl:mt-[4vh]' variants={fadeInUp}>
            9:00〜17:00
        </motion.h2>
        <motion.p className='text-sm md:text-base lg:text-lg xl:text-xl xl:mt-[0.5vh]' variants={fadeInUp}>
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

    )
}
