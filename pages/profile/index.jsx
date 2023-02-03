import style from '../../styles/Profile.module.css';
import { toast } from "react-toastify";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../components/firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from '../../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { doc, deleteDoc } from "firebase/firestore";

const Profile = () => {

const router = useRouter()
const {user,setUser,getDate} = useContext(GlobalContext)
const [allBlogs,setAllBlogs] = useState()
const [loading,setLoading] = useState(false)
const [alert,setAlert] = useState(false)

const myBlogs = allBlogs?.filter(blog=> blog.blogData.authorID === user?.uid)


    function signOut() {
        router.push('/')
        localStorage.setItem("user", JSON.stringify({}));
        setUser({})
        toast.success("Successfully signed out!");
      }

    function editBlog(){
        setAlert(true)
    }

  async function deleteBlog(id){
        // setAlert(true)
        try {
            await deleteDoc(doc(db, "blogs", id));
            toast.success("Blog deleted successfully!")
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }

      useEffect(() => {
        if(!user) {
            router.push('/')
        }
    }, [])
    
    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
          const allBlogs = [];
          snapshot.docs.forEach((doc) => {
            allBlogs.push({ id: doc.id, ...doc.data() });
          });
          setAllBlogs(allBlogs);
          setLoading(false);
        });
    
        return () => {
          unsub();
        };
      }, []);

  return (
    <section className={style.profile}>
        {alert && <div className={style.overlay}></div>}
        
            {
                alert && <section className={style.alert}>
                    <h2>Do you want to delete this blog ?</h2>
                    <div>
                        <button>Yes</button>
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
          
        {loading && <h1 className={style.loading}>Loading</h1>}    
        { myBlogs?.length === 0  ? <h1 className={style.noBlog}>No blogs available</h1> :  myBlogs?.map((blog,i)=> {

                const {blogImgUrl,title,cetagory,date} = blog.blogData
                const {id} = blog

                return(
                    <article className={style.blogCard} key={i}>
                        <Image src={blogImgUrl} alt={"blog Image"} width={150} height={150} />
                        <div className={style.blogRight}>
                            <h1> {title} </h1>
                            <h3>{cetagory} </h3>
                            <p> {getDate(date)} </p>
                            <div className={style.icons}>
                            <FontAwesomeIcon
                                onClick={editBlog}
                                className={style.icon}
                                icon={faEdit}
                                />
                                <FontAwesomeIcon
                                onClick={()=> deleteBlog(id)}
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
    </section>
  )
}

export default Profile

