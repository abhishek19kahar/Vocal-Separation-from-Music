// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleSuccess } from '../utils';
// import { FaPowerOff } from "react-icons/fa";
// import styles from './Home.module.css';  
// import { ToastContainer } from 'react-toastify';

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     }, [])

//     const handleLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User Loggedout');
//         setTimeout(() => {
//             navigate('/login');
//         }, 1000)
//     }

//     return (
//         <div className={styles.bodys}>  
//             <header className={styles.header}> 
//                 <h1>Welcome {loggedInUser}
//                 <button onClick={handleLogout} className={styles.logoutButton}>
//                 <FaPowerOff /> 
//                 </button>
//                 </h1>
//                 <nav className={styles.navbar}>  
//                     <a href="./home">Home</a>
//                     <a href="/about">About</a>
//                     <a href="/services">Services</a>
//                     <a href="/contact">Contact</a>
//                 </nav>
//             </header>

//             <div className={styles.box}>  

//             </div>

//             <ToastContainer />
//         </div>
//     )
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { FaPowerOff } from "react-icons/fa";
import styles from './Home.module.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
function UploadAudio() {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [results, setResults] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioFiles, setAudioFiles] = useState([]); // Store fetched audio files


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const fetchAudioFiles = async () => {
        try {
            console.log("Fetching audio files from: http://localhost:8080/api/audio-files");
            const response = await axios.get('http://localhost:8080/api/audio-files', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("Response data:", response.data); // Debugging line
            if (response.data.success) {
                setAudioFiles(response.data.files || []);
            } else {
                console.error('No audio files found');
            }
        } catch (error) {
            console.error('Error fetching audio files:', error);
            // handleError('Error fetching audio files:', error.message);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            setIsProcessing(true);
            setProgress(0);

            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setProgress(percent);
                },
            });

            if (response.data.success) {
                handleSuccess('File uploaded successfully!');
                fetchAudioFiles(); // Fetch updated list of audio files
            } else {
                handleError(response.data.message || 'Processing failed!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Fetch audio files on component mount
    useEffect(() => {
        fetchAudioFiles();
    }, []);


    return (
        <div className={styles.music}>
            <h1>Audio Processor</h1>

            {/* File Input */}
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                disabled={isProcessing}
            />
            <button className={styles.bt} onClick={handleUpload} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Upload and Process'}
            </button>

            {/* Progress Bar */}
            {isProcessing && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {/* Display Audio Files */}
            <div className={styles.results}>
                <h2>Audio Files:</h2>
                {audioFiles.length > 0 ? (
                    <ul className={styles.ul}>
                        {audioFiles.map((file, index) => (

                            <li key={index}>

                                <audio controls>
                                    <source src={`http://localhost:8080/audio/${file.fileName}`} type="audio/wav" download />
                                    Your browser does not support the audio element.
                                </audio>
                                <a href={`http://localhost:8080/audio/${file.fileName}`} download={file.fileName}   >
                                  <button className={styles.bt1} style={{ marginRight: "10px" }} >  Download {file.fileName}</button>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}



// Home Component with Navbar and Upload Audio section
function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div className={styles.bodys}>
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

            <div className={styles.box}>
                <UploadAudio />  {/* Integrating UploadAudio component */}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;
