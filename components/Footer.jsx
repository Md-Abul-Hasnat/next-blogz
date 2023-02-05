import Image from "next/image";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const date = new Date();

  return (
    <section className={styles.footer}>
      <div className={styles.footerWrapper}>
        <article className={styles.footerLeft}>
          <Link href={"/"}>BLOGZ</Link>

          <ul>
            <li>
              <small>Address:</small>
              <p>4578 Marmora Road, Glasgow</p>
            </li>
            <li>
              <small>Phones:</small>
              <p>+1-123-456-78-89</p>
              <p>+1-123-456-78-89</p>
            </li>
           
            <li>
              <small>Email:</small>
              <p>blogz@gmail.com</p>
            </li>
          </ul>
        </article>
        <article className={styles.footerMid}>
          <h2>USEFUL LINKS</h2>
          <ul>
            <Link href={"/"}> Home </Link>
            <Link href={"/about"}> About </Link>
            <Link href={"/create"}> Create </Link>
            <Link href={"/contact"}> Contact </Link>
            <Link href={"/privacypolicy "}> Privacy policy </Link>
          </ul>
        </article>
        <article className={styles.footerRight}>
          <h2>ABOUS US</h2>
          <p>
            BLACKFIT – fitness health center where your body gets its shape!
            Start training now to stay fit and healthy all year round!
          </p>

          <h2 className={styles.iconsEl}>OUR SOCIALS</h2>
          <div className={styles.icons}>
            <FontAwesomeIcon className={styles.icon} icon={faFacebook} />
            <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
            <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
          </div>
        </article>
      </div>
      <p className={styles.copyright}>
        © All rights reserved by BLOGZ | {`${date.getFullYear()}`}
      </p>
    </section>
  );
};

export default Footer;
