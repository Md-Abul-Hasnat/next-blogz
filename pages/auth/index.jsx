import styles from "../../styles/Auth.module.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Image from "next/image";
// import {auth} from '../../components/firebaseConfig'

const Auth = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  //    functions

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleResetEmail(e) {
    setResetEmail(e.target.value);
  }

  function handleSignUp(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        updateProfile(auth.currentUser, {
          displayName: form.username,
        })
          .then(() => {
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("User created successfully");
            location.state ? navigate(location.state.from) : navigate("/");
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Signed in successfully");
        location.state ? navigate(location.state.from) : navigate("/");
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
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
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
                <Image
                  className={styles.profilePic}
                  src={"/pic.png"}
                  width={200}
                  height={200}
                  alt="Profile picture"
                />
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
