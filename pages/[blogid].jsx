import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../components/Context";
import HomeRightPart from "../components/HomeRightPart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BlogDetail.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import { useRouter } from "next/router";
import ReletedBlogs from "../components/ReletedBlogs";

const blogDetail = ({ blogs }) => {
  const { getDate } = useContext(GlobalContext);

  const router = useRouter();
  

  const selectedBlog = blogs?.find(
    (blog) => blog.blogData.blogID === router.query?.blogid
  );

  const { author, authorImgUrl, blogImgUrl, body, cetagory, date, title } =
    selectedBlog?.blogData;

  const reletedBlogs = blogs?.filter(
    (blog) => blog.blogData.cetagory === cetagory
  );

  return (
    <section className={styles.blogDetail}>
      <main className={styles.blogDetailWrapper}>
        <article className={styles.left}>
          <h3>
            Blogz / {cetagory} / {title}
          </h3>
          <h1>{title} </h1>
          <p className={styles.detail}>
            <Image
              className={styles.authorImg}
              src={authorImgUrl}
              alt="author"
              width={60}
              height={60}
            />
            {author} /
            <FontAwesomeIcon className={styles.clock} icon={faClock} />
            {getDate(date)}
          </p>
          <Image
            className={styles.blogImg}
            src={blogImgUrl}
            alt="author"
            width={600}
            height={300}
            priority={true}
          />
          <p className={styles.blogText}>{body}</p>
        </article>
        <article className={styles.right}>
          <HomeRightPart blogs={blogs} />
        </article>
      </main>

      <ReletedBlogs reletedBlogs={reletedBlogs} />
    </section>
  );
};

export default blogDetail;

export async function getServerSideProps() {
  const blogs = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    blogs.push(doc.data());
  });

  return {
    props: { blogs },
  };
}
