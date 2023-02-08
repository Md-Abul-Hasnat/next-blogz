import styles from "../styles/Home.module.css";
import HeroSwiper from "../components/HeroSwiper";
import Trending from "../components/Trending";
import HeroMain from "../components/HeroMain";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import PopularCetagory from "../components/PopularCetagory";
import { motion } from "framer-motion";


export default function Home({ allBlogs }) {


  return (
    <motion.section
     className={styles.home} 
     initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}
    >
      <HeroSwiper blogs={allBlogs} />
      <Trending blogs={allBlogs} />
      <HeroMain blogs={allBlogs} />
      <PopularCetagory blogs={allBlogs} />
    </motion.section>
  );
}

export async function getStaticProps() {
  const blogs = [];
  
  const querySnapshot = await getDocs(collection(db, "blogs"));

  querySnapshot.forEach((doc) => {
    blogs.push(doc.data());
  });

  return {
    props: { allBlogs: blogs },
    revalidate: 10,
    
  };
}
