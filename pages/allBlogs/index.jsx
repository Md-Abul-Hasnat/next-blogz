import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../components/firebaseConfig";
import BlogCard from "../../components/BlogCard";
import style from "../../styles/AllBlogs.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogsLength, setBlogLength] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const first = query(collection(db, "blogs"), limit(9));
      const documentSnapshots = await getDocs(first);
      const data = documentSnapshots.docs.map((doc) => doc.data());
      setAllBlogs(data);
      setLoading(false);
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
    setBlogLength([...allBlogs, ...data].length);
    if (allBlogs.length === blogsLength) {
      setError(true);
      toast.success("No more blogs available!!");
    }
  }

  return (
    <>
      {loading ? (
        <img className={style.loading} src="/loading.gif" alt="loading" />
      ) : (
        <section className={style.allBlogs}>
          <main className={style.allBlogsWrapper}>
            {allBlogs?.map((blog, i) => {
              return <BlogCard data={blog} key={i} />;
            })}
          </main>
          {!error && (
            <button className={style.loadBtn} onClick={nextPageData}>
              Load more
            </button>
          )}
        </section>
      )}
    </>
  );
};

export default AllBlogs;
