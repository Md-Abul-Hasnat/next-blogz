import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../components/Context";
import HomeRightPart from "../components/HomeRightPart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BlogDetail.module.css";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import ReletedBlogs from "../components/ReletedBlogs";
import { motion } from "framer-motion";

const blogDetail = ({ blog,blogs }) => {

  const { getDate } = useContext(GlobalContext);
 
  const { author, authorImgUrl, blogImgUrl, body, cetagory, date, title } = blog[0]

  const reletedBlogs = blogs.filter(data => data.cetagory === cetagory && data.blogID !== blog[0].blogID)


  return (
    <motion.section
     className={styles.blogDetail}
     initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}>
      
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
            width={500}
            height={500}
            priority={true}
          />
          <p className={styles.blogText}>{body}</p>
        </article>
        <article className={styles.right}>
          <HomeRightPart blogs={blogs} />
        </article>
      </main>

      <ReletedBlogs reletedBlogs={reletedBlogs} />
    </motion.section>
  );
};

export default blogDetail;

export async function getServerSideProps({params}) {

  const ref = collection(db, "blogs");
  const q = query(ref, where("blogID", "==", `${params.blogid}`));
  const querySnapshot = await getDocs(q);
  const allBlogSnapshot = await getDocs(ref)
 const blog = querySnapshot.docs.map((doc) => doc.data() );
 const blogs =  allBlogSnapshot.docs.map((doc) => doc.data() );

  return {
    props: { blog,blogs },
  };
}
