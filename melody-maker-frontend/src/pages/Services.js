import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa";
import { handleSuccess } from '../utils';
import styles from './Css/Services.module.css'; 
import { ToastContainer } from 'react-toastify';

const Services = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleToggleService = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <div>
      {/* Header Section */}
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

      {/* Main Content Section */}
      <div className={styles.servicesContainer}>
        <h1 className={styles.pageTitle}>Our Services</h1>

        <div className={styles.servicesSection}>
          {/* Service 1: Vocal Removal for Karaoke */}
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>Vocal Removal for Karaoke</h2>
            <p className={styles.serviceDescription}>
              Create perfect karaoke tracks by isolating the instrumental version of your favorite songs.
            </p>
            <button 
              className={styles.learnMoreButton} 
              onClick={() => handleToggleService(1)}
            >
              {activeService === 1 ? 'Show Less' : 'Learn More'}
            </button>
            {activeService === 1 && (
              <div className={styles.moreInfo}>
                <p>
                  Our Vocal Removal service uses cutting-edge machine learning algorithms to isolate the vocal track
                  and leave behind the instrumental. This service works well for most popular songs.
                </p>
              </div>
            )}
          </div>

          {/* Service 2: Instrumental Music Creation */}
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>Instrumental Music Creation</h2>
            <p className={styles.serviceDescription}>
              Perfect for music producers and remix artists who need high-quality instrumental tracks.
            </p>
            <button 
              className={styles.learnMoreButton} 
              onClick={() => handleToggleService(2)}
            >
              {activeService === 2 ? 'Show Less' : 'Learn More'}
            </button>
            {activeService === 2 && (
              <div className={styles.moreInfo}>
                <p>
                  Our service provides a pristine instrumental track for use in music production, remixing, or karaoke.
                </p>
              </div>
            )}
          </div>

          {/* Service 3: Remix Ready */}
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>Remix Ready</h2>
            <p className={styles.serviceDescription}>
              Extract instrumental portions of songs for remixes, mashups, and more.
            </p>
            <button 
              className={styles.learnMoreButton} 
              onClick={() => handleToggleService(3)}
            >
              {activeService === 3 ? 'Show Less' : 'Learn More'}
            </button>
            {activeService === 3 && (
              <div className={styles.moreInfo}>
                <p>
                  This service allows you to quickly extract instrumental sections of songs, perfect for remixing and mashups.
                </p>
              </div>
            )}
          </div>

          {/* Service 4: Music Practice and Learning */}
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>Music Practice and Learning</h2>
            <p className={styles.serviceDescription}>
              Extract instrumental tracks for practice, learning, or performance.
            </p>
            <button 
              className={styles.learnMoreButton} 
              onClick={() => handleToggleService(4)}
            >
              {activeService === 4 ? 'Show Less' : 'Learn More'}
            </button>
            {activeService === 4 && (
              <div className={styles.moreInfo}>
                <p>
                  Practice along with your favorite songs, or use the instrumental track for music learning or performance.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}> <Link to="/home">Try Melody Maker Now</Link></button>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Services;

