import { db } from "../../components/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import BlogCard from '../../components/BlogCard'
import style from '../../styles/Cetagory.module.css'
import { useState } from "react";
import { motion } from "framer-motion";


const Cetagory = ({blogs}) => {
  
  const router = useRouter()
  const [showBlog,setShowBlog] = useState(blogs.slice(0,12))


  function loadMore(){
    if(showBlog.length === 12) setShowBlog(blogs.slice(0,24))
    if(showBlog.length === 24) setShowBlog(blogs.slice(0,36))
    if(showBlog.length === 36) setShowBlog(blogs.slice(0,48))
    if(showBlog.length === 48) setShowBlog(blogs.slice(0,60))
  }

  return (
   <motion.section 
      className={style.cetagory} 
      initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}>

    <h1 className={style.cetagoryName}> {router.query.cetagoryname} </h1>
    <main className={style.cetagoryWrapper}>
      {blogs.length === 0 ? <h1 className={style.notFound}>No blog found !</h1> :
        showBlog.map((blog,i) => <BlogCard data={blog} key={i} /> )
      }
    </main>
    {
     showBlog.length === blogs.length ? "" : <button className={style.load} onClick={loadMore}>Load more</button> 
    }
     
   </motion.section>
  )
}

export default Cetagory

export async function getServerSideProps({params}){

  const q = query(collection(db, "blogs"), where("cetagory", "==", `${params.cetagoryname}` ));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

     return {
       props: { blogs: data },
     };
 }