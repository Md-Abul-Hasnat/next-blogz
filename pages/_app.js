import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Context from "../components/Context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BLOGZ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Context>
        <Navbar />
        <ToastContainer autoClose={1000} />
        <Component {...pageProps} />
        <Footer />
      </Context>
    </>
  );
}