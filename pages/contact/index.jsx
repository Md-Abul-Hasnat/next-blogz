import style from '../../styles/Contact.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Image from 'next/image';
import { motion } from "framer-motion";

const Contact = () => {
 
  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_myr3kp4",
        "template_u6zgtna",
        form.current,
        "rr9dxnXOskRUPFyUA"
      )
      .then(
        () => {
          toast.success("Email sent successfully!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          toast.error(`${error}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  return (
    <motion.section 
    initial={{ x: 300, opacity: 0 }}
     animate={{ x: 0, opacity: 1 }}
     exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.3 }}>
     
        <header className={style.subHeader}>
          <Image src={'/phone.jpg'} alt="Image" width={500} height={300} priority={true} />
          <div className={style.mainTitle}>
            <h1>Contact Us</h1>
          </div>
        </header>
        <main className={style.contact}>
          <div className={style.contactWrapper}>
            <div className={style.contactLeft}>
              <FontAwesomeIcon
                className={style.envelop} 
                icon={faEnvelopeOpenText}
              />
              <p>
                If you have any questions or just want to get in touch, use the
                form . We look forward to hearing from you!
              </p>
            </div>
            <div className={style.contactRight}>
              <h1>Contact Form</h1>
              <form onSubmit={sendEmail}>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  required
                />
                <br />
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  required
                />
                <br />

                <textarea
                  placeholder="Message"
                  name="message"
                  required
                ></textarea>
                <br />
                <button className={`${style.btn} ${style.sendBtn}`} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </main>
     
    </motion.section>
  );
};

export default Contact;
