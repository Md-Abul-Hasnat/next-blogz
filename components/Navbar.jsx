import styles from "../styles/Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { GlobalContext } from "./Context";
import Image from "next/image";

const Navbar = () => {

  const { user} = useContext(GlobalContext);
  
  const userDetail = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null

  const [click, setClick] = useState(false);


  function handleClick() {
    setClick(!click);
  }


  return (
    <nav
      className={ styles.navbar}
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
          <Link href={"/profile"}>
           <Image src={userDetail.photoURL} className={click ? `${styles.profile} ${styles.hide}` : `${styles.profile}`} alt={user} width={50} height={50} />
          </Link>
          ) : (
            <Link
            className={click ? `${styles.signIn} ${styles.hide}` : `${styles.signIn}`}
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
