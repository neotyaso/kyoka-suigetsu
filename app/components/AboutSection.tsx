"use client";

import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from '../constants/animations';

export default function AboutSection(): React.JSX.Element {
    return (
        <motion.div
            className='text-center h-auto pb-[5vh] lg:mt-[12vh]'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
        <motion.img
          src="/images/home/matsu.jpg"
          alt="竹のイラスト"
          className="mx-auto"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h1 className='text-bold font-yuji text-2xl md:text-3xl lg:text-4xl xl:text-5xl' variants={fadeInUp}>
          鏡花水月城とは
        </motion.h1>
        <motion.p className='font-yuji text-base md:text-lg lg:text-xl xl:text-xl mt-[2vh] md:mt-[3vh] lg:mt-[6vh] xl:mt-[8vh] mx-8 md:mx-10 lg:mx-31 xl:mx-50' variants={fadeInUp}>
          鏡花水月城──それは、現実と幻想の境界に浮かび上がる、静謐なる城。<br />
          名の由来は「鏡に映る花、水に浮かぶ月」の如く、手に取れそうで決して触れることのできない美しさを意味しています。<br />
          この城はかつて、戦の世を離れた一人の武将が、心の安寧を求めて築いたと伝えられています。<br />
          訪れた者の心もまた、静かに整えられていきます。<br />
          歴史書にはほとんど名を残していないにもかかわらず、人々の記憶の中でひそかに語り継がれてきたこの城は、まさに「存在しないことの美」を体現する場所なのかもしれません。
        </motion.p>
      </motion.div>
    );
}


