"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion.create(Link);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function Footer(): React.JSX.Element {
  return (
    <motion.footer
      className="bg-[#5c554f] text-white h-auto py-10 md:py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="font-bold font-yuji max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link href="/">
            <motion.h2
              className="text-3xl pt-[2vh] inline-block hover:opacity-80 transition-opacity duration-300"
              variants={fadeInUp}
            >
              鏡花水月城
            </motion.h2>
          </Link>
          
          <motion.p
            className="text-base md:text-lg pt-[1vh] xl:pt-[2vh] text-gray-200"
            variants={fadeInUp}
          >
            現実と幻想の境界に浮かぶ、静謐なる城
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm pt-[4vh] px-4"
            variants={fadeInUp}
          >
            <MotionLink
              href="/access"
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              プライバシーポリシー
            </MotionLink>

            <MotionLink
              href="/access"
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              利用規約
            </MotionLink>

            <MotionLink
              href="/contact"
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              お問い合わせ
            </MotionLink>
          </motion.div>

          <motion.div
            className="mt-8 pt-6 border-t border-gray-600/50 text-center text-xs md:text-sm text-gray-300"
            variants={fadeInUp}
          >
            <p>&copy; 2026 鏡花水月城. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}