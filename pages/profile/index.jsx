import style from '../../styles/Profile.module.css';
import { toast } from "react-toastify";
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../components/firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from '../../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Profile = ({allBlogs}) => {

const router = useRouter()
const {user,setUser,getDate} = useContext(GlobalContext)

const myBlogs = allBlogs.filter(blog=> blog.blogData.authorID === user?.uid)
    

    function signOut() {
        router.push('/')
        localStorage.setItem("user", JSON.stringify({}));
        setUser({})
        toast.success("Successfully signed out!");
      }

      useEffect(() => {
        if(!user) {
            router.push('/')
        }
    }, [])
    

  return (
    <section className={style.profile}>
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
        {
            myBlogs.map((blog,i)=> {

                const {blogImgUrl,title,cetagory,date,blogID} = blog.blogData

                return(
                    <Link href={`/${blogID}`} className={style.blogCard} key={i}>
                        <Image src={blogImgUrl} alt={"blog Image"} width={150} height={150} />
                        <div className={style.blogRight}>
                            <h1> {title} </h1>
                            <h3>{cetagory} </h3>
                            <p> {getDate(date)} </p>
                            <div className={style.icons}>
                            <FontAwesomeIcon
                                className={style.icon}
                                icon={faEdit}
                                />
                                <FontAwesomeIcon
                                className={style.icon}
                                icon={faTrash}
                                />
                            </div>
                        </div>
                    </Link>
                )
            })
        }
        </main>
    </section>
  )
}

export default Profile

export async function getServerSideProps() {
    const blogs = [];
  
    const querySnapshot = await getDocs(collection(db, "blogs"));
  
    querySnapshot.forEach((doc) => {
      blogs.push(doc.data());
    });
  
    return {
      props: { allBlogs: blogs },
    };
  }
  