import style from '../../styles/Profile.module.css';
import { toast } from "react-toastify";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc  } from "firebase/firestore";
import { db } from '../../components/firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from '../../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from "framer-motion";

const Profile = () => {

const router = useRouter()
const {user,setUser,getDate,reduceText,setEdit} = useContext(GlobalContext)
const [allBlogs,setAllBlogs] = useState()
const [loading,setLoading] = useState(false)
const [alert,setAlert] = useState(false)
const [blogID,setBlogID] = useState() 
const [runEffect,setRunEffect] = useState(false)

const myBlogs = allBlogs?.filter(blog=> blog.authorID === user?.uid)

    function signOut() {
        router.push('/')
        localStorage.setItem("user", JSON.stringify({}));
        setUser({})
        toast.success("Successfully signed out!");
      }

    function editBlog(blog){
    setEdit({
        value : true,
        data : blog
    })
    router.push("/create")
    }

  async function deleteBlog(id){
        try {
            setAlert(false)
            await deleteDoc(doc(db, "blogs", id));
            toast.success("Blog deleted successfully!")
            setRunEffect(!runEffect)
        } catch (error) {
            setAlert(false)
            toast.error('Something went wrong!')
        }
    }

    function setID(id){
        setBlogID(id)
        setAlert(true)
    }

      useEffect(() => {
        if(!user) {
            router.push('/')
        }
    }, [])
    
  

    useEffect(() => {
   
        async function getBlogs(){
            setLoading(true)
            const q = query(collection(db, "blogs"), where("authorID", "==", user?.uid));
           const querySnapshot = await getDocs(q);
          const data =   querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });
        setAllBlogs(data)
        setLoading(false)
        }
        
        getBlogs()
      }, [runEffect]);



  return (
    <motion.section
     className={style.profile}
     initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}>

        {alert && <div className={style.overlay}></div>}
        
            {
                alert && <section className={style.alert}>
                    <h2>Do you want to delete this blog ?</h2>
                    <div>
                        <button onClick={()=> deleteBlog(blogID)}>Yes</button>
                        <button onClick={()=> setAlert(false)}>No</button>
                    </div>
                </section>
            }
        
        <h1>PROFILE</h1>
        <article className={style.top}>
        <div className={style.userInfo}>
            <Image className={style.userImg} src={user?.photoURL} alt={'User Image'} width={130} height={130} priority={true} />
            <div className={style.userName}>
                <h1> {user?.displayName}</h1>
                <p> {user?.email} </p>
            </div>
        </div>
        <button onClick={signOut} className={style.logOut}>LOG OUT</button>
        </article>
        <h2>My blogs</h2>
        <main className={style.profileWrapper}>
          
        {loading && <img src={'/spinner.gif'}  className={style.loading} alt="spinner" /> }    
        { myBlogs?.length === 0  ? <h1 className={style.noBlog}>No blogs available</h1> :  myBlogs?.map((blog,i)=> {

                const {id} = blog
                const {blogImgUrl,title,cetagory,date,blogID} = blog

                return(
                    <article className={style.blogCard} key={i}>
                        <Image src={blogImgUrl} alt={"blog Image"} width={150} height={150} priority={true} />
                        <div className={style.blogRight}>
                            <Link href={`/${blogID}`}> {reduceText(title,80)}... </Link>
                            <h3>{cetagory} </h3>
                            <p> {getDate(date)} </p>
                            <div className={style.icons}>
                            <FontAwesomeIcon
                                onClick={()=> editBlog(blog)}
                                className={style.icon}
                                icon={faEdit}
                                />
                                <FontAwesomeIcon
                                onClick={()=> setID(id)}
                                className={style.icon}
                                icon={faTrash}
                                />
                            </div>
                        </div>
                    </article>
                )
            })
        }
        </main>
    </motion.section>
  )
}

export default Profile

