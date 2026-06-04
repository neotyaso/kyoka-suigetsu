"use client";

import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from "../constants/animations";
import Link from "next/link";

export default function HomeFooter(): React.JSX.Element {
    return (
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
                <motion.h2 className="text-3xl pt-[2vh]" variants={fadeInUp}>
                    鏡花水月城
                </motion.h2>
                <motion.p className="text-lg pt-[1vh] xl:pt-[2vh]" variants={fadeInUp}>
                    現実と幻想の境界に浮かぶ、静謐なる城
                </motion.p>
                
                <motion.div className="flex justify-center space-x-8 text-sm pt-[3vh] xl:pt-[4vh]" variants={fadeInUp}>
                <motion.div className="hover:text-gray-300 cursor-pointer transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                    プライバシーポリシー
                </motion.div>
                <Link href="/access">
                    <motion.div className="hover:text-gray-300 cursor-pointer transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                    利用規約
                    </motion.div>
                </Link>
                <Link href="/contact">
                    <motion.div className="hover:text-gray-300 cursor-pointer transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                    お問い合わせ
                    </motion.div>
                </Link>
                </motion.div>
                
                <motion.div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm" variants={fadeInUp}>
                <p>&copy; 2026 鏡花水月城. All rights reserved.</p>
                </motion.div>
            </motion.div>
            </div>
      </motion.footer>
    )

}
