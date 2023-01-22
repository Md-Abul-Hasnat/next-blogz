import styles from "../styles/HeroRightPart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedinIn,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "./Context";

const HomeRightPart = ({ blogs }) => {
  const { getDate, reduceText } = useContext(GlobalContext);

  const cetagories = [
    "Education",
    "Programming",
    "Gaming",
    "Politics",
    "Sports",
    "Nature",
    "Digital Marketing",
  ];

  const popularBlogs = blogs.filter(
    (blog) =>
      blog.blogData.cetagory === "Digital Marketing" ||
      blog.blogData.cetagory === "Sports" ||
      blog.blogData.cetagory === "Nature"
  );

  return (
    <div className={styles.rightSection}>
      <div className={styles.aboutBlogz}>
        <h1>BLOGZ</h1>
        <p>
          Hello, We’re content writer who is fascinated by content fashion,
          celebrity and lifestyle. We helps clients bring the right content to
          the right people.
        </p>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon className={styles.fbIcon} icon={faFacebookF} />
          <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
          <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
          <FontAwesomeIcon className={styles.icon} icon={faLinkedinIn} />
        </div>
      </div>

      <div className={styles.exploreTopics}>
        <h1>Explore Topics</h1>
        <ul>
          {cetagories.map((cetagory, i) => {
            return (
              <Link key={i} href={`/cetagory/${cetagory}`}>
                <small>{cetagory} </small>
                <small>
                  {
                    blogs.filter((blog) => blog.blogData.cetagory === cetagory)
                      .length
                  }
                </small>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className={styles.popularPosts}>
        <h1>Popular Blogs</h1>
        {popularBlogs.slice(0, 5).map((blog, i) => {
          const { title, blogImgUrl, date, blogID } = blog.blogData;
          return (
            <Link key={i} href={`/${blogID}`}>
              <Image
                className={styles.image}
                width={105}
                height={105}
                src={blogImgUrl}
                alt="Popular blog"
              />
              <div className="detail">
                <h4> {reduceText(title, 50)} </h4>
                <p> {getDate(date)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeRightPart;
