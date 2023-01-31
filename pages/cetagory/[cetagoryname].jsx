import { db } from "../../components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import BlogCard from '../../components/BlogCard'
import style from '../../styles/Cetagory.module.css'
import { useState } from "react";


const Cetagory = ({allBlogs}) => {

  const router = useRouter()
  const selectedCetagoryBlogs = allBlogs?.filter(blog => blog.blogData.cetagory === router.query.cetagoryname )
  const [showBlog,setShowBlog] = useState(selectedCetagoryBlogs.slice(0,12))


  function loadMore(){
    if(showBlog.length === 12) setShowBlog(selectedCetagoryBlogs.slice(0,24))
    if(showBlog.length === 24) setShowBlog(selectedCetagoryBlogs.slice(0,36))
    if(showBlog.length === 36) setShowBlog(selectedCetagoryBlogs.slice(0,48))
    if(showBlog.length === 48) setShowBlog(selectedCetagoryBlogs.slice(0,60))
  }

  return (
   <section className={style.cetagory}>
    <h1 className={style.cetagoryName}> {router.query.cetagoryname} </h1>
    <main className={style.cetagoryWrapper}>
      {selectedCetagoryBlogs.length === 0 ? <h1 className={style.notFound}>No blog found !</h1> :
        showBlog.map((blog,i) => <BlogCard data={blog.blogData} key={i} /> )
      }
    </main>
    {
     showBlog.length === selectedCetagoryBlogs.length ? "" : <button className={style.load} onClick={loadMore}>Load more</button> 
    }
     
   </section>
  )
}

export default Cetagory

export async function getServerSideProps(){

       const querySnapshot = await getDocs(collection(db, "blogs")); 
        const blogData =   querySnapshot.docs.map((doc) => doc.data() );
  
     return {
       props: { allBlogs: blogData },
     };
 }