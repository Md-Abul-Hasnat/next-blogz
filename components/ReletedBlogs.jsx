import styles from "../styles/ReletedBlogs.module.css";
import BlogCard from "./BlogCard";

const ReletedBlogs = ({ reletedBlogs }) => {
  return (
    <section className={styles.reletedBlogs}>
      <h1>Releted Blogs</h1>
      <main className={styles.reletedBlogsWrapper}>
        {reletedBlogs.map((blog, i) => {
          return <BlogCard data={blog.blogData} key={i} />;
        })}
      </main>
    </section>
  );
};

export default ReletedBlogs;
