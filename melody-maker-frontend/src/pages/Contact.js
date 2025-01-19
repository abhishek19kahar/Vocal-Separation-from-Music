import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError  } from "../utils";
import { FaPowerOff } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import styles from "./Css/Contact.module.css";  

function Contact() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleSuccess("Your message has been sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Failed to send message.");
        alert("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      handleError ("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.bodys}>
      <header className={styles.header}>
        <h1>
          Welcome {loggedInUser}
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaPowerOff />
          </button>
        </h1>
        <nav className={styles.navbar}>
          <a href="./home">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className={styles.box}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>We’d love to hear from you!</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={styles.input}
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className={styles.input}
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className={styles.textarea}
            required
          />
          <button type="submit" className={styles.button}>Send Message</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Contact;
