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
import { motion } from "framer-motion";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    async function getData() {
      setLoading(true);
      const first = query(collection(db, "blogs"), limit(12));
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
    const next = query(collection(db, "blogs"), startAfter(lastDoc), limit(12));
    const documentSnapshots = await getDocs(next);
    const data = documentSnapshots.docs.map((doc) => doc.data());
    setAllBlogs([...allBlogs, ...data]);

    const lastDocument =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setLastDoc(lastDocument);
    
    if (!lastDocument ) {
      setError(true);
      toast.success("No more blogs available!!");
    }
   
  }

  return (
    <motion.section 
      initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}>
      {loading ? (
        <img className={style.loading} src="/load.gif" alt="loading" />
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
    </motion.section>
  );
};

export default AllBlogs;
