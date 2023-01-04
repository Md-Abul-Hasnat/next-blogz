import styles from "../styles/Home.module.css";
import HeroSwiper from "../components/HeroSwiper";
import Trending from "../components/Trending";

export default function Home() {
  return (
    <section className={styles.home}>
      <HeroSwiper />
      <Trending />
    </section>
  );
}
