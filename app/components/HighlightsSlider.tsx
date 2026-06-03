"use client";

import Link from 'next/link';
import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from '../constants/animations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HighlightsSlider(): React.JSX.Element {
    return (
        <motion.div
                className='h-auto pb-[5vh] mt-[3vh] xl:mt-[5vh]'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
        <section>
          <motion.section className='relative h-[42vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]' variants={fadeInUp}>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="h-full"
            >
              <SwiperSlide>
                <motion.img src="/images/Highlight/sakura_siki.jpg" alt="春の城" className="w-full h-full object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img src="/images/Highlight/siro.jpg" alt="城" className="w-full h-full object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img src="/images/Highlight/momizi-2.jpg" alt="秋の城" className="w-full h-full object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img src="/images/Highlight/yuki.jpg" alt="冬の城" className="w-full h-full object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
              </SwiperSlide>
            </Swiper>
          </motion.section>


          {/* もっと見るボタン */}
          <Link href="/highlight" className="block w-full mt-[4vh] px-8">
            <motion.button
              className='bg-[#5c554f] hover:bg-[#403c37] text-white font-yuji w-full max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto block py-3 md:py-4 xl:py-5 transition-all duration-300'
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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
