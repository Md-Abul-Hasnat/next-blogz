import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../styles/HeroSwiper.module.css";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "./Context";

export default function HeroSwiper({ blogs }) {
  const { reduceText } = useContext(GlobalContext);

  return (
    <section className={styles.heroSwiper}>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          850: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        modules={[Pagination]}
        className={styles.mySwiper}
      >
        {blogs.slice(0,8).map((blog, i) => {
          const { blogImgUrl, cetagory, title, blogID } = blog;
          return (
            <SwiperSlide key={i} className={styles.SwiperSlide}>
              <div className={styles.image}>
                <Image src={blogImgUrl} width={200} height={200} alt="Image" />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.swiperBlogDetails}>
                <p> {cetagory} </p>
                <Link className={styles.title} href={`/${blogID}`}>
                  {reduceText(title, 60)}...
                </Link>
                
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
