import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../components/Context";
import styles from "../../styles/Create.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db, storage } from "../../components/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const CreateBlog = () => {
  const router = useRouter();
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    setBlogData({
      ...blogData,
      author: user?.displayName,
      authorID: user?.uid,
      authorImgUrl: user?.photoURL,
    });
  }, [user]);

  const date = new Date().getTime();

  const [blogData, setBlogData] = useState({
    title: "",
    cetagory: "",
    isTrending: "",
    body: "",
    blogImgUrl: "",
    blogID: uuidv4(),
    date: date,
    author: user?.displayName,
    authorImgUrl: user?.photoURL,
    authorID: user?.uid,
  });

  function uploadImage(e) {
    const storageRef = ref(storage, `images/${e.target.value}`);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          setBlogData({ ...blogData, blogImgUrl: url });
        })
        .catch((error) => {
          toast.error("Image upload failed!!");
        });
    });
  }

  function updateFormData(e) {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  }

  async function publishBlog(e) {
    e.preventDefault();

    if (blogData.body.length < 100) {
      return toast.error("Your blog is too short!!");
    }

    if (blogData.blogImgUrl) {
      try {
        await addDoc(collection(db, "blogs"), {
          blogData,
        });
        toast.success("Blog created successfully");
        router.push("/");
        setBlogData({
          title: "",
          cetagory: "",
          isTrending: "",
          body: "",
          blogImgUrl: "",
        });
      } catch (e) {
        toast.error("Something went wrong!!");
      }
    } else {
      toast.error("Image is required!!");
    }
  }

  return (
    <section
      className={styles.create}
      style={{ height: `${user?.email ? "fit-content" : "100vh"}` }}
    >
      {!user?.email ? (
        <section className={styles.warning}>
          <h1>Please make sure you are signed in</h1>
          <Link href={"/auth"}> Sign in</Link>
        </section>
      ) : (
        <section>
          <article className={styles.blogForm}>
            <h1>Create Blog</h1>
            <form className={styles.blogFormWrapper} onSubmit={publishBlog}>
              <Image
                src={`${
                  blogData.blogImgUrl ? blogData.blogImgUrl : "/placeholder.jpg"
                }`}
                alt="blog image"
                width={500}
                height={500}
                priority={true}
              />
              <button className={styles.image}>
                <label htmlFor="image">
                  <FontAwesomeIcon className={styles.icon} icon={faPlus} />
                </label>
                <input
                  name="image"
                  id="image"
                  type="file"
                  accept="image"
                  onChange={uploadImage}
                />
              </button>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={updateFormData}
                value={blogData.title}
                required
              />
              <div className={styles.blogDetail}>
                <div className={styles.cetagory}>
                  <select
                    onChange={updateFormData}
                    name="cetagory"
                    value={blogData.cetagory}
                    required
                  >
                    <option value="">select a cetagory</option>
                    <option value="Sports">Sports</option>
                    <option value="Politics">Politics</option>
                    <option value="Education">Education</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="World Affairs">World Affairs</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
                <div className={styles.trending}>
                  <select
                    value={blogData.isTrending}
                    onChange={updateFormData}
                    name="isTrending"
                    required
                  >
                    <option value="">Is it trending </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <textarea
                className={styles.blogDescription}
                placeholder="Body"
                onChange={updateFormData}
                name="body"
                value={blogData.body}
                required
              ></textarea>
              <input type="submit" value="Submit" />
            </form>
          </article>
        </section>
      )}
    </section>
  );
};

export default CreateBlog;
