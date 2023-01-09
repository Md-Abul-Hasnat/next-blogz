import styles from "../styles/Trending.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "./Context";

const Trending = ({ blogs }) => {
  const { reduceText, getDate } = useContext(GlobalContext);

  const trendingBlog = blogs.filter(
    (blog) => blog.blogData.isTrending === "yes"
  );

  return (
    <section className={styles.trending}>
      <h3>
        <FontAwesomeIcon className={styles.icon} icon={faChartLine} />
        TRENDING ON BLOGZ
      </h3>
      <div className={styles.trendingWrapper}>
        {trendingBlog.map((blog, i) => {
          const { author, authorImgUrl, title, date } = blog.blogData;
          return (
            <Link key={i} href={"/"} className={styles.trendingBlog}>
              <div className={styles.top}>
                <Image
                  src={authorImgUrl}
                  width={30}
                  height={30}
                  alt="author"
                  className={styles.author}
                />
                <h4>{author}</h4>
              </div>
              <div className={styles.bottom}>
                <h2>{reduceText(title, 50)} ...</h2>
                <p>{getDate(date)} </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
