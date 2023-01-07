import styles from "../styles/HeroMain.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import HomeRightPart from "./HomeRightPart";
import BlogCard from "./BlogCard";

const HeroMain = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className={styles.heroMain}>
      <h1>
        <FontAwesomeIcon className={styles.icon} icon={faBlog} /> RECENT BLOGS
      </h1>
      <div className={styles.heroMainWrapper}>
        <div className={styles.heroLeft}>
          {arr.map((blog, i) => {
            return <BlogCard key={i} />;
          })}
        </div>
        <div className={styles.heroRight}>
          <HomeRightPart />
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
