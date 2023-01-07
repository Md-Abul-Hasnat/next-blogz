import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../../components/Context";
import styles from "../../styles/Create.module.css";

const Create = () => {
  const { user } = useContext(GlobalContext);

  console.log(user);

  return (
    <section
      className={styles.create}
      style={{ height: `${user.email ? "fit-content" : "100vh"}` }}
    >
      {!user?.email ? (
        <section className={styles.warning}>
          <h1>Please make sure you are signed in</h1>
          <Link href={"/auth"}> Sign in</Link>
        </section>
      ) : (
        <section>
          <h1>hello</h1>
        </section>
      )}
    </section>
  );
};

export default Create;
