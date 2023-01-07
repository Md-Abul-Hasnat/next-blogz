import styles from "../styles/Home.module.css";
import HeroSwiper from "../components/HeroSwiper";
import Trending from "../components/Trending";
import HeroMain from "../components/HeroMain";

export default function Home() {
  return (
    <section className={styles.home}>
      <HeroSwiper />
      <Trending />
      <HeroMain />
    </section>
  );
}
