import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {

    const fadeInUp: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
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
    return (
    <motion.footer
      className="bg-[#5c554f] text-white h-[30vh]"
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
        <Link href="/">
          <motion.h2
            className="text-3xl pt-[2vh]"
            variants={fadeInUp}
          >
            鏡花水月城
          </motion.h2>
        </Link>
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
            <Link href="access">
            <motion.div
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              プライバシーポリシー
            </motion.div>
            </Link>
            <Link href="access">
            <motion.div
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              利用規約
            </motion.div>
            </Link>
            <Link href="contact">
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
            <p>&copy; 2026 鏡花水月城. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>

  )
}
