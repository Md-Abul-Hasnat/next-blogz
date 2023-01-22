import styles from "../styles/HeroMain.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import HomeRightPart from "./HomeRightPart";
import BlogCard from "./BlogCard";
import Link from "next/link";

const HeroMain = ({ blogs }) => {
  return (
    <section className={styles.heroMain}>
      <h1>
        <FontAwesomeIcon className={styles.icon} icon={faBlog} /> RECENT BLOGS
      </h1>
      <div className={styles.heroMainWrapper}>
        <div className={styles.heroLeft}>
          {blogs.slice(0, 8).map((blog, i) => {
            return <BlogCard data={blog.blogData} key={i} />;
          })}
          <Link className={styles.btn} href={"/"}>
            View all blogs
          </Link>
        </div>
        <div className={styles.heroRight}>
          <HomeRightPart blogs={blogs} />
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
