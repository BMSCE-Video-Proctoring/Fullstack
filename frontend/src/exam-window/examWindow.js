// import React, { useState, useEffect } from "react";
// import "./examWindow.css";
// import Timer from "../Timer";
// import { useParams } from 'react-router-dom';
// import TimeUpModal from "../Components/TimeUpModal";
// import axios from 'axios';

// const ExamWindow = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [testLink, setTestLink] = useState('');

//   // Duration in seconds as of now
//   const [testDuration, setTestDuration] = useState(0);

//   // Timer component will only be rendered when the isLoading state is false
//   const [isLoading, setIsLoading] = useState(true);         

//   const { testCode } = useParams();

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/createTest/${testCode}/`)
//       .then(response => {
//         const testDetails = response.data;
//         setTestLink(testDetails.link);
//         setTestDuration(testDetails.duration);
//         setIsLoading(false);      // Set loading to false after fetching data
//       })
//       .catch(error => {
//         console.error('Error fetching test details:', error);
//         setIsLoading(false); // Set loading to false even on error
//       });

//     // Start the webcam when the component mounts
//     startWebCam();

//     return () => {
//       // Stop the webcam when the component unmounts
//       stopWebCam();
//     };
//   }, [testCode]);

//   const startWebCam = () => {
//     navigator.mediaDevices.getUserMedia({ audio: false, video: true })
//       .then((stream) => {
//         setLocalStream(stream);
//       });
//   };

//   const stopWebCam = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//   };

//   const handleTimeUp = () => {
//     // Called when the time is up
//     // Set isTimeUp to true
//     console.log("Timer has ended. Stopping camera.");
//     setIsTimeUp(true);

//     // Show the modal when time is up
//     openModal();

//     // Stop the webcam
//     stopWebCam();
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="App">
//       <div className="timer-container">
//         {!isLoading && (
//           <Timer onTimeUp={handleTimeUp} testDuration={testDuration} />
//         )}
//       </div>
//       <div className="video-container">
//         {localStream && (
//           <video
//             autoPlay
//             ref={(video) => {
//               if (video) {
//                 video.srcObject = localStream;
//               }
//             }}
//             className="video"
//           />
//         )}
//         {/* Embed Google Form */}
//         <iframe
//           src={testLink}
//           frameBorder="0"
//           marginHeight="0"
//           marginWidth="0"
//           title="Google Form"
//           className="google-form"
//         >
//           Loading...
//         </iframe>
//       </div>
//       {/* Conditionally render the modal */}
//       {isModalOpen && (
//         <TimeUpModal onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default ExamWindow;



import React, { useState, useEffect } from "react";
import "./examWindow.css";
import Timer from "../Timer";
import { useParams } from "react-router-dom";
import TimeUpModal from "../Components/TimeUpModal";
import axios from "axios";

const ExamWindow = () => {
  const [localStream, setLocalStream] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testLink, setTestLink] = useState("");
  const [testDuration, setTestDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { testCode } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/createTest/${testCode}/`)
      .then((response) => {
        const testDetails = response.data;
        setTestLink(testDetails.link);
        setTestDuration(testDetails.duration);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test details:", error);
        setIsLoading(false);
      });

    startWebCam();

    return () => {
      stopWebCam();
    };
  }, [testCode]);

  const startWebCam = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        setLocalStream(stream);

        // Start sending frames to the Django backend
        sendFrames(stream);
      });
  };

  const stopWebCam = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  // const sendFrames = (stream) => {
  //   const videoTrack = stream.getVideoTracks()[0];
  //   const imageCapture = new ImageCapture(videoTrack);

  //   const sendFrameToBackend = async () => {
  //     try {
  //       const blob = await imageCapture.grabFrame();
  //       console.log(typeof blob);
  //       const formData = new FormData();
  //       formData.append("frame", blob, "frame.jpg");

  //       // Send the frame to the Django backend
  //       await axios.post("http://127.0.0.1:8000/analyze/", formData);
  //     } catch (error) {
  //         console.error("Error capturing frame:", error);
  //     }
  //   };

  //   // Capture and send frames at a specific interval (e.g., every second)
  //   const frameInterval = setInterval(sendFrameToBackend, 1000);

  //   // Stop capturing frames when the component unmounts
  //   return () => clearInterval(frameInterval);
  // };

  const sendFrames = (stream) => {
    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
  
    const sendFrameToBackend = async () => {
      try {
        const imageBitmap = await imageCapture.grabFrame();
  
        // Create a canvas and draw the ImageBitmap on it
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const context = canvas.getContext('2d');
        context.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
  
        // Convert the canvas to a Blob
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("frame", blob, "frame.jpg");
  
          // Send the frame to the Django backend
          await axios.post("http://127.0.0.1:8000/analyze/", formData)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error("Error sending frame:", error);
            });
        }, 'image/jpeg');
      } catch (error) {
          console.error("Error capturing frame:", error);
      }
    }

    // Capture and send frames at a specific interval (e.g., every second)
    const frameInterval = setInterval(sendFrameToBackend, 1000);

    // Stop capturing frames when the component unmounts
    return () => clearInterval(frameInterval);
  }

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
      {isModalOpen && <TimeUpModal onClose={closeModal} />}
    </div>
  );
};

export default ExamWindow;
