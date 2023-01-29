import styles from "../../styles/About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedinIn,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import HomeRightPart from "../../components/HomeRightPart";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebaseConfig";

const About = ({ blogs }) => {
  return (
    <section>
      <div className={styles.specificCetagoryHead}>
        <Image
          className={styles.aboutBG}
          src={"/aboutBG.jpeg"}
          width={500}
          height={500}
          alt="background img"
          priority={true}
        />
        <h1> ABOUT US </h1>
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutLeft}>
          <div className={styles.top}>
            <Image
              src={"/about1.webp"}
              width={500}
              height={500}
              alt="about us"
              priority={true}
            />
            <h2>About us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              ab laudantium voluptate aliquam nihil error esse repudiandae in
              mollitia et, consequuntur suscipit modi natus labore. Officiis
              voluptas itaque, hic voluptatibus provident accusantium! Quo,
              nesciunt enim sapiente eius corporis dolorum perferendis aut
              minus, fugiat odio inventore culpa ad rem illo molestiae
              distinctio. Consectetur eaque cumque debitis sint dolores ullam
              repellat et?
            </p>
          </div>
          <div className={styles.bottom}>
            <img src={"/about2.webp"} alt="about us" />
            <div className={styles.bottomRight}>
              <h2>Our mission</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                eaque provident dolore, distinctio aut maxime itaque possimus
                quisquam dolores iste.
              </p>
              <ul>
                <li>This is our mission one illum ornatus.</li>
                <li>This is our mission two illum ornatus.</li>
                <li>This is our mission three illum ornatus.</li>
              </ul>
            </div>
          </div>
          <div className={styles.aboutBottom}>
            <h2>Follow us on</h2>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faFacebookF}
              />
              <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
              <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
              <FontAwesomeIcon className={styles.icon} icon={faLinkedinIn} />
            </div>
          </div>
        </div>
        <div className={styles.aboutRight}>
          <HomeRightPart blogs={blogs} />
        </div>
      </div>
    </section>
  );
};

export default About;

export async function getStaticProps() {
  const blogs = [];

  const querySnapshot = await getDocs(collection(db, "blogs"));

  querySnapshot.forEach((doc) => {
    blogs.push(doc.data());
  });

  return {
    props: { blogs },
    revalidate: 10,
  };
}
