import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../components/firebaseConfig";
import BlogCard from "../../components/BlogCard";
import style from "../../styles/AllBlogs.module.css";
import { useEffect, useState } from "react";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState();

  useEffect(() => {
    async function getData() {
      const first = query(collection(db, "blogs"), limit(9));
      const documentSnapshots = await getDocs(first);
      const data = documentSnapshots.docs.map((doc) => doc.data());
      setAllBlogs(data);

      const lastDocument =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastDocument);
    }
    getData();
  }, []);

  async function nextPageData() {
    const next = query(collection(db, "blogs"), startAfter(lastDoc), limit(9));
    const documentSnapshots = await getDocs(next);
    const data = documentSnapshots.docs.map((doc) => doc.data());
    setAllBlogs([...allBlogs, ...data]);

    const lastDocument =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setLastDoc(lastDocument);
  }

  return (
    <section className={style.allBlogs}>
      <main className={style.allBlogsWrapper}>
        {allBlogs?.map((blog, i) => {
          return <BlogCard data={blog.blogData} key={i} />;
        })}
      </main>
      <button onClick={nextPageData}>Next</button>
    </section>
  );
};

export default AllBlogs;
