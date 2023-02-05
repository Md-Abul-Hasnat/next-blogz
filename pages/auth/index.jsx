import styles from "../../styles/Auth.module.css";
import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { auth, storage } from "../../components/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { GlobalContext } from "../../components/Context";

const Auth = () => {
  
  const router = useRouter();
  const { setUser } = useContext(GlobalContext);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [image,setImage] = useState(null)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  //    functions

  const readImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };


  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleResetEmail(e) {
    setResetEmail(e.target.value);
  }

  function handleSignUp(e) {
    e.preventDefault();

    if (form.email && form.password && form.username && form.profilePic) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          updateProfile(auth.currentUser, {
            displayName: form.username,
            photoURL: form.profilePic,
          })
            .then(() => {
              localStorage.setItem("user", JSON.stringify(user));
              router.push("/");
              toast.success("Successfully signed in");
            })
            .catch((error) => {
              toast.error(error);
            });
         
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("Profile picture is required !!");
    }
  }

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
        toast.success("Signed in successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  function handleUpdatePassword(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        toast.success("Check your email");
        setResetEmail("");
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  function uploadImage(e) {
    readImage(e)
    const storageRef = ref(storage, `images/${e.target.value}`);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          setForm({ ...form, profilePic: url });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <div>
      {forgotPassword ? (
        <section className={styles.forgotPass}>
          <h1>Please provide your email address.</h1>
          <form className={styles.form} onSubmit={handleUpdatePassword}>
            <input
              onChange={handleResetEmail}
              value={resetEmail}
              placeholder="Email"
              type="email"
              required
            />
            <br />
            <input type="submit" value={"Recieve email"} />
          </form>
        </section>
      ) : (
        <section
          className={styles.auth}
          style={{ height: `${isSignUp ? "120vh" : "90vh"}` }}
        >
          <main className={styles.authWrapper}>
            <h1>Sign {isSignUp ? "up" : "in"} </h1>
            <form
              className={styles.form}
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
            >
              {isSignUp && (
                <>
                  <Image
                    className={styles.profilePic}
                    src={  image ? image : "/pic.png"}
                    width={200}
                    height={200}
                    alt="Profile picture"
                  />
                  <button className={styles.btn}>
                    <FontAwesomeIcon className={styles.icon} icon={faImage} />
                    <input
                      onChange={uploadImage}
                      value={form.image}
                      className={styles.file}
                      type="file"
                    />
                  </button>
                </>
              )}
              {isSignUp && (
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={form.username}
                  onChange={handleFormChange}
                  required
                />
              )}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleFormChange}
                required
              />
              {!isSignUp && (
                <p onClick={() => setForgotPassword(!forgotPassword)}>
                  Forgot password?
                </p>
              )}
              <input type="submit" value={isSignUp ? "Sign up" : "Sign in"} />
            </form>
            <p>
              {isSignUp ? "Already" : "Don't"} have an account ?
              <span
                className={styles.signUp}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </main>
        </section>
      )}
    </div>
  );
};

export default Auth;
