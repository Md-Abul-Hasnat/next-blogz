import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../../components/Context";
import styles from "../../styles/Create.module.css";

const CreateBlog = () => {
  const { user } = useContext(GlobalContext);

  return (
    <section
      className={styles.create}
      style={{ height: `${user?.email ? "fit-content" : "100vh"}` }}
    >
      {!user?.email ? (
        <section className={styles.warning}>
          <h1>Please make sure you are signed in</h1>
          <Link href={"/auth"}> Sign in</Link>
        </section>
      ) : (
        <section>
          <article className={styles.blogForm}>
            <h1>Create Blog</h1>
            <form className={styles.blogFormWrapper}>
              <Image src={"/1.png"} alt="blog image" width={500} height={500} />
              <input type="text" placeholder="Title" />
              <div className={styles.blogDetail}>
                <div className={styles.cetagory}>
                  <select name="cars" id="cars">
                    <option value="">Please select a cetagory</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div className={styles.trending}>
                  <label for="cars">Is it a trending topic</label>

                  <select name="cars" id="cars">
                    <option value="volvo">yes</option>
                    <option value="saab">No</option>
                  </select>
                </div>
              </div>
              <textarea
                className={styles.blogDescription}
                placeholder="Description"
              ></textarea>
              <input type="submit" value="Submit" />
            </form>
          </article>
        </section>
      )}
    </section>
  );
};

export default CreateBlog;
