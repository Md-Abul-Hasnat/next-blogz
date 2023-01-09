import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BlogCard.module.css";
import { useContext } from "react";
import { GlobalContext } from "./Context";

const BlogCard = ({ data }) => {
  const { getDate, reduceText } = useContext(GlobalContext);

  const {
    author,
    authorImgUrl,
    blogID,
    blogImgUrl,
    body,
    cetagory,
    date,
    title,
  } = data;

  return (
    <article className={styles.mainBlogCard}>
      <Link href={`/blog/${blogID}`} className={styles.blogCard}>
        <div className={styles.top}>
          <Image
            className={styles.image}
            src={blogImgUrl}
            alt="blog"
            width={400}
            height={300}
          />
          <p className={styles.cetagoryName}> {cetagory} </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <p>
              <Image
                className={styles.blogImage}
                src={authorImgUrl}
                alt="author"
                width={30}
                height={30}
              />
              {author}
            </p>
            <p>
              <FontAwesomeIcon className={styles.blogIcon} icon={faClock} />
              {getDate(date)}
            </p>
          </div>
          <h2 className={styles.blogTitle}>{reduceText(title, 60)}</h2>
          <p className={styles.blogText}>{reduceText(body, 120)}</p>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
