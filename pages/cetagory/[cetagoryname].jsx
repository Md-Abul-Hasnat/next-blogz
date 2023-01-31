import { db } from "../../components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import BlogCard from '../../components/BlogCard'
import style from '../../styles/Cetagory.module.css'


const Cetagory = ({allBlogs}) => {
  const router = useRouter()
  const selectedCetagory = allBlogs?.filter(blog => blog.blogData.cetagory === router.query.cetagoryname )
    
  
  return (
   <section className={style.cetagory}>
    <h1 className={style.cetagoryName}> {router.query.cetagoryname} </h1>
    <main className={style.cetagoryWrapper}>
      {
        selectedCetagory?.map((blog,i) => <BlogCard data={blog.blogData} key={i} /> )
      }
    </main>
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