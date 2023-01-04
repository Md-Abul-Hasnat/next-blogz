import styles from "../styles/Trending.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Trending = () => {
  return (
    <section className={styles.trending}>
      <h3>
        <FontAwesomeIcon className={styles.icon} icon={faChartLine} />
        TRENDING ON BLOGZ
      </h3>
      <div className={styles.trendingWrapper}>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
        <Link href={"/"} className={styles.trendingBlog}>
          <div className={styles.top}>
            <Image
              src={"/face.jpg"}
              width={30}
              height={30}
              className={styles.author}
            />
            <h4>Barak Obama</h4>
          </div>
          <div className={styles.bottom}>
            <h2>How to become a programmer in 2023. You have to try ...</h2>
            <p>Dec 24, 2022</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Trending;
