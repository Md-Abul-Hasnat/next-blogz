import styles from "../styles/Home.module.css";
import HeroSwiper from "../components/HeroSwiper";
import Trending from "../components/Trending";
import HeroMain from "../components/HeroMain";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import PopularCetagory from "../components/PopularCetagory";


export default function Home({ allBlogs }) {

  return (
    <section className={styles.home}>
      <HeroSwiper blogs={allBlogs} />
      <Trending blogs={allBlogs} />
      <HeroMain blogs={allBlogs} />
      <PopularCetagory blogs={allBlogs} />
    </section>
  );
}

export async function getServerSideProps() {
  const blogs = [];

  const querySnapshot = await getDocs(collection(db, "blogs"));

  querySnapshot.forEach((doc) => {
    blogs.push(doc.data());
  });

  return {
    props: { allBlogs: blogs },
  };
}
