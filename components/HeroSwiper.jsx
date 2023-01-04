import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HeroSwiper.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HeroSwiper() {
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
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <img src={"/1.png"} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <img src={"/1.png"} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <img src={"/1.png"} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <img src={"/1.png"} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <Image src={"/1.png"} width={200} height={200} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <div className={styles.image}>
            <img src={"/1.png"} alt="Image" />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.swiperBlogDetails}>
            <p> Sports </p>
            <h1>Misconceptions Related to Quran and Muslims</h1>
            <Link href={`/blogDetail`}>
              Read more
              <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
