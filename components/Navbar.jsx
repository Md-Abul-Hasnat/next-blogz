import styles from "../styles/Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { GlobalContext } from "./Context";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(GlobalContext);

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

  function signOut() {
    setUser({});
    localStorage.setItem("user", JSON.stringify({}));
    toast.success("Successfully signed out!");
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
          <Link onClick={handleClick} href={"/about"}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} href={"/create"}>
            CREATE
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} href={"/contact"}>
            CONTACT
          </Link>
        </li>
        <li>
          {user?.email ? (
            <button onClick={signOut} className={styles.signoutBtn}>
              Sign out
            </button>
          ) : (
            <Link
              className={styles.signIn}
              onClick={handleClick}
              href={"/auth"}
            >
              SIGN IN
            </Link>
          )}
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
