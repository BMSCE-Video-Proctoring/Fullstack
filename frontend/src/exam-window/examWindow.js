import React, { useState, useEffect } from "react";
import "./examWindow.css";
import Timer from "../Timer";
import { useParams } from 'react-router-dom';
import TimeUpModal from "../Components/TimeUpModal";
import axios from 'axios';

const ExamWindow = () => {
  const [localStream, setLocalStream] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testLink, setTestLink] = useState('');

  // Duration in seconds as of now
  const [testDuration, setTestDuration] = useState(0);

  // Timer component will only be rendered when the isLoading state is false
  const [isLoading, setIsLoading] = useState(true);         

  const { testCode } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/createTest/${testCode}/`)
      .then(response => {
        const testDetails = response.data;
        setTestLink(testDetails.link);
        setTestDuration(testDetails.duration);
        setIsLoading(false);      // Set loading to false after fetching data
      })
      .catch(error => {
        console.error('Error fetching test details:', error);
        setIsLoading(false); // Set loading to false even on error
      });

    // Start the webcam when the component mounts
    startWebCam();

    return () => {
      // Stop the webcam when the component unmounts
      stopWebCam();
    };
  }, [testCode]);

  const startWebCam = () => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  };

  const stopWebCam = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const handleTimeUp = () => {
    // Called when the time is up
    // Set isTimeUp to true
    console.log("Timer has ended. Stopping camera.");
    setIsTimeUp(true);

    // Show the modal when time is up
    openModal();

    // Stop the webcam
    stopWebCam();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="timer-container">
        {!isLoading && (
          <Timer onTimeUp={handleTimeUp} testDuration={testDuration} />
        )}
      </div>
      <div className="video-container">
        {localStream && (
          <video
            autoPlay
            ref={(video) => {
              if (video) {
                video.srcObject = localStream;
              }
            }}
            className="video"
          />
        )}
        {/* Embed Google Form */}
        <iframe
          src={testLink}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Google Form"
          className="google-form"
        >
          Loading...
        </iframe>
      </div>
      {/* Conditionally render the modal */}
      {isModalOpen && (
        <TimeUpModal onClose={closeModal} />
      )}
    </div>
  );
};

export default ExamWindow;

