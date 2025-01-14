import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa";
import { handleSuccess } from '../utils';
import styles from './Css/About.module.css';  
import { ToastContainer } from 'react-toastify';

function About() {

    const [isExpanded, setIsExpanded] = useState(false); 

  const toggleContent = () => {
    setIsExpanded(!isExpanded); 
  };
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    return (
        <div>
            <header className={styles.header}>
                <h1>Welcome {loggedInUser}
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

              <div>
               <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About Melody Maker</h1>
      
      {/* Dividing the content into two sections */}
      <div className={styles.mainContent}>
        
        {/* Left Part (Intro) */}
        <div className={styles.leftContent}>
          <p className={styles.aboutDescription}>
            Melody Maker is an innovative web-based tool designed to separate vocals from instrumental tracks in songs.
            Whether you're a musician, producer, or hobbyist, this tool makes it easier than ever to isolate vocals or instrumental tracks from any song. 
            Using advanced machine learning algorithms, Melody Maker delivers clean, professional-quality results.
          </p>
        </div>
        
        {/* Right Part (Extended Info) */}
        <div className={`${styles.rightContent} ${isExpanded ? styles.expanded : ''}`}>
          <h2 className={styles.sectionTitle}>Our Vision</h2>
          <p className={styles.aboutDescription}>
            Our goal is to empower musicians, producers, and audio enthusiasts with easy-to-use technology that saves time and effort in producing high-quality tracks. 
            By providing a fast, reliable vocal separation tool, we aim to revolutionize the way people create and interact with music.
          </p>

          <h2 className={styles.sectionTitle}>Key Features:</h2>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>🗣 Advanced Vocal Separation: Separate vocals and instrumentals using cutting-edge machine learning models, providing clear, professional-quality output.</li>
            <li className={styles.featureItem}>🎶 High-Quality Audio: With a focus on audio fidelity, we ensure the highest quality of vocal separation without any distortion or loss in clarity.</li>
            <li className={styles.featureItem}>💻 User-Friendly Interface: Simple and intuitive web interface to upload tracks, preview results, and download the separated tracks effortlessly.</li>
            <li className={styles.featureItem}>📈 Fast Processing Speed: The tool processes audio files quickly, ensuring minimal wait time, even for long tracks.</li>
            <li className={styles.featureItem}>🔄 Multiple Formats Support: Upload various audio file formats (MP3, WAV, etc.) and get your desired results in a few minutes.</li>
          </ul>

          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <p className={styles.aboutDescription}>
            Melody Maker leverages the latest advancements in artificial intelligence and audio processing. The backend is powered by Python and utilizes powerful libraries such as Librosa, TensorFlow, and PyTorch for model training and inference. The frontend is built with React, providing a smooth, responsive user experience.
          </p>

          <p className={styles.aboutDescription}>
            Key Technologies Used:
          </p>
          <ul className={styles.techStackList}>
            <li className={styles.techStackItem}>🔧 Python (Backend) – For implementing the vocal separation model and handling server-side operations.</li>
            <li className={styles.techStackItem}>🧠 TensorFlow/PyTorch (Machine Learning) – For training the deep learning models that enable vocal separation.</li>
            <li className={styles.techStackItem}>⚛️ React (Frontend) – For creating an interactive and user-friendly web interface.</li>
            <li className={styles.techStackItem}>🎧 Librosa – A Python library for audio analysis, used for processing and analyzing the audio tracks.</li>
            <li className={styles.techStackItem}>⚙️ Node.js (Backend API) – For creating a RESTful API to handle requests between the frontend and the backend.</li>
            <li className={styles.techStackItem}>🔒 JWT Authentication – Secure user authentication and session management using JSON Web Tokens.</li>
          </ul>

          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.aboutDescription}>
            The vocal separation process involves advanced deep learning models that have been trained on thousands of songs with both vocal and instrumental versions. 
            These models learn to differentiate between the vocal and instrumental components of a song. When you upload a track, the model analyzes the audio file and outputs two separate tracks: one for the vocals and one for the instrumental background. 
            All of this happens in real time, ensuring you can get the results quickly and efficiently.
          </p>

          <h2 className={styles.sectionTitle}>Future Plans</h2>
          <p className={styles.aboutDescription}>
            We're continuously improving the vocal separation algorithm to provide even better results, particularly for complex audio files. 
            In the future, we plan to offer additional features such as pitch correction, tempo adjustment, and the ability to edit the generated tracks directly in the app.
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button onClick={toggleContent} className={styles.readMoreButton}>
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>

      <p className={styles.footerMessage}>
        Join the Melody Maker community and unlock the potential of your audio tracks today!
      </p>
    </div>
         
            </div>
            <ToastContainer />
        </div>
    )
}

export default About;
