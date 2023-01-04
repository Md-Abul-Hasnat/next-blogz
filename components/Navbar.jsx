import styles from "../styles/Navbar.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);

  useEffect(() => {
    function showNav() {
      if (window.scrollY > 0) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    }
    window.addEventListener("scroll", showNav);
  }, []);

  function handleClick() {
    setClick(!click);
  }

  return (
    <nav
      className={
        stickyNav ? `${styles.navbar} ${styles.sticky}` : `${styles.navbar}`
      }
    >
      <Link href={"/"} className={styles.logo}>
        <h1>BLOGZ</h1>
      </Link>
      <ul
        className={
          click ? `${styles.navMenu} ${styles.active}` : styles.navMenu
        }
      >
        <li>
          <Link onClick={handleClick} href={"/"}>
            HOME
          </Link>
        </li>

        <li>
          <Link onClick={handleClick} href={"/"}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} href={"/"}>
            CREATE
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} href={"/"}>
            CONTACT
          </Link>
        </li>
        <li>
          <Link className={styles.signIn} onClick={handleClick} href={"/"}>
            SIGN IN
          </Link>
        </li>
        <FontAwesomeIcon
          className={styles.faXmark}
          icon={faXmark}
          onClick={handleClick}
        />
      </ul>
      <FontAwesomeIcon
        className={styles.faBars}
        icon={faBars}
        onClick={handleClick}
      />
    </nav>
  );
};

export default Navbar;
