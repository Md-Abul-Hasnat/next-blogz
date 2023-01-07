import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BlogCard.module.css";

const BlogCard = () => {
  return (
    <article className={styles.mainBlogCard}>
      <Link href={`/blogDetail`} className={styles.blogCard}>
        <div className={styles.top}>
          <Image
            className={styles.image}
            src={"/1.png"}
            alt="blog"
            width={400}
            height={300}
          />
          <p className={styles.cetagoryName}> programming </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <p>
              <Image
                className={styles.blogImage}
                src={"/3.jpg"}
                alt="author"
                width={30}
                height={30}
              />
              Hasnat
            </p>
            <p>
              <FontAwesomeIcon className={styles.blogIcon} icon={faClock} />2
              dec 2023
            </p>
          </div>
          <h2 className={styles.blogTitle}>
            This is a blog title about programng lets gos
          </h2>
          <p className={styles.blogText}>
            This is a blog title about programming This is a blog title about
            programming This is a blog title about programming
          </p>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
