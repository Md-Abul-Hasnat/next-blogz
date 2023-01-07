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

const HomeRightPart = () => {
  const cetagories = [
    "Education",
    "Programming",
    "Religion",
    "Gaming",
    "Politics",
    "Sports",
    "Nature",
  ];

  //   const { blogs } = useContext(GlobalContext);

  //   const popularBlogs = blogs.filter(
  //     (blog) =>
  //       blog.cetagory === "Religion" ||
  //       blog.cetagory === "Programming" ||
  //       blog.cetagory === "Nature"
  //   );

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
          {/* {cetagories.map((cetagory, i) => { */}
          {/* return ( */}
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          <Link href={`/cetagory`}>
            <small>Sports </small>
            <small>2</small>
          </Link>
          {/* );
          })} */}
        </ul>
      </div>

      <div className={styles.popularPosts}>
        <h1>Popular Blogs</h1>
        {/* {popularBlogs.slice(0, 5).map((blog, i) => { */}
        {/* const { title, imgUrl, date, uniqueID } = blog; */}
        {/* return ( */}
        <Link href={`/blogDetail`}>
          <Image
            className={styles.image}
            width={105}
            height={105}
            src={"/1.png"}
            alt="Popular blog"
          />
          <div className="detail">
            <h4>This is a blog title </h4>
            <p> 2 dec 2023 </p>
          </div>
        </Link>
        <Link href={`/blogDetail`}>
          <Image
            className={styles.image}
            width={105}
            height={105}
            src={"/1.png"}
            alt="Popular blog"
          />
          <div className="detail">
            <h4>This is a blog title </h4>
            <p> 2 dec 2023 </p>
          </div>
        </Link>
        <Link href={`/blogDetail`}>
          <Image
            className={styles.image}
            width={105}
            height={105}
            src={"/1.png"}
            alt="Popular blog"
          />
          <div className="detail">
            <h4>This is a blog title </h4>
            <p> 2 dec 2023 </p>
          </div>
        </Link>
        <Link href={`/blogDetail`}>
          <Image
            className={styles.image}
            width={105}
            height={105}
            src={"/1.png"}
            alt="Popular blog"
          />
          <div className="detail">
            <h4>This is a blog title </h4>
            <p> 2 dec 2023 </p>
          </div>
        </Link>
        {/* );
        })} */}
      </div>
    </div>
  );
};

export default HomeRightPart;
