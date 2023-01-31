import styles from "../styles/PopularCetagory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "./Context";
import Image from "next/image";

const PopularCetagory = ({ blogs }) => {
  const { reduceText, getDate } = useContext(GlobalContext);

  const sportsBlogs = blogs.filter(
    (blog) => blog.blogData.cetagory === "Sports"
  );
  const politicsBlogs = blogs.filter(
    (blog) => blog.blogData.cetagory === "Politics"
  );
  const programmingBlogs = blogs.filter(
    (blog) => blog.blogData.cetagory === "Programming"
  );

  return (
    <section className={styles.PopularCetagory}>
      <h1>POPULAR CETAGORIES</h1>
      <main className={styles.PopularCetagoryWrapper}>
        <article className={styles.cetagory}>
          <div className={styles.cetagoryName}>
            <h2>Sports</h2>
          </div>
          <div className={styles.cetagoryBlogs}>
            {sportsBlogs.slice(0,3).map((blog, i) => {
              const { blogImgUrl, title, date, blogID } = blog.blogData;
              return (
                <Link href={`/${blogID}`} key={i}>
                  <Image src={blogImgUrl} width={150} height={150} alt="blog" />
                  <div className={styles.blogRight}>
                    <h2>{reduceText(title, 50)}...</h2>
                    <p>
                      <FontAwesomeIcon className={styles.icon} icon={faClock} />
                      {getDate(date)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </article>
        <article className={styles.cetagory}>
          <div className={styles.cetagoryName}>
            <h2>Programming</h2>
          </div>
          <div className={styles.cetagoryBlogs}>
            {programmingBlogs.slice(0,3).map((blog, i) => {
              const { blogImgUrl, title, date, blogID } = blog.blogData;
              return (
                <Link href={`/${blogID}`} key={i}>
                  <Image src={blogImgUrl} width={150} height={150} alt="blog" />
                  <div className={styles.blogRight}>
                    <h2>{reduceText(title, 50)}...</h2>
                    <p>
                      <FontAwesomeIcon className={styles.icon} icon={faClock} />
                      {getDate(date)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </article>
        <article className={styles.cetagory}>
          <div className={styles.cetagoryName}>
            <h2>Educaion</h2>
          </div>
          <div className={styles.cetagoryBlogs}>
            {politicsBlogs.slice(0,3).map((blog, i) => {
              const { blogImgUrl, title, date, blogID } = blog.blogData;
              return (
                <Link href={`/${blogID}`} key={i}>
                  <Image src={blogImgUrl} width={150} height={150} alt="blog" />
                  <div className={styles.blogRight}>
                    <h2>{reduceText(title, 50)}...</h2>
                    <p>
                      <FontAwesomeIcon className={styles.icon} icon={faClock} />
                      {getDate(date)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </article>
      </main>
    </section>
  );
};

export default PopularCetagory;
