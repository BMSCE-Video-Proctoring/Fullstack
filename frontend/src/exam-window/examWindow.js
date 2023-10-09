// import React from "react";
// import "./examWindow.css";
// import Timer from "../Timer"; // Import the Timer component

// class ExamWindow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { localStream: null };
//   }

//   componentDidMount() {}

//   startWebCam = () => {
//     const that = this;
//     navigator.mediaDevices
//       .getUserMedia({
//         audio: false,
//         video: true
//       })
//       .then((stream) => {
//         that.setState({ localStream: stream });
//       });
//   };

//   stopWebCam = () => {
//     this.state.localStream.getTracks().forEach((track) => {
//       track.stop();
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <div className="timer-container">
//           <Timer /> {/* Render the Timer component */}
//         </div>
//         <div className="video-container">
//           {this.state.localStream && (
//             <video
//               autoPlay
//               ref={(video) => {
//                 if (video) {
//                   video.srcObject = this.state.localStream;
//                 }
//               }}
//               className="video"
//             />
//           )}
//           {/* Embed Google Form */}
//           <iframe
//             src="https://docs.google.com/forms/d/e/1FAIpQLSfPCdTm1_rJmcAvh8EmwCuaijVPPorYDi7UQZR95bICIMlNKg/viewform?embedded=true"
//             frameborder="0"
//             marginheight="0"
//             marginwidth="0"
//             title="Google Form"
//             className="google-form"
//           >
//             Loading...
//           </iframe>
//         </div>
//         <div className="startStopWebCam">
//           <button
//             className="WebCamButton"
//             onClick={this.startWebCam.bind(this)}
//           >
//             Start
//           </button>
//           <button className="WebCamButton" onClick={this.stopWebCam.bind(this)}>
//             Stop
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default ExamWindow;

import React from "react";
import "./examWindow.css";
import Timer from "../Timer"; // Import the Timer component
import TimeUpModal from "../Components/TimeUpModal";

class ExamWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      isTimeUp: false, // Add state variable to track if time is up
      isModalOpen: false,
    };
  }

  componentDidMount() {
    // Start the webcam when the component mounts
    this.startWebCam();
  }

  componentWillUnmount() {
    // Stop the webcam when the component unmounts
    this.stopWebCam();
  }

  startWebCam = () => {
    const that = this;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then((stream) => {
        that.setState({ localStream: stream });
      });
  };

  stopWebCam = () => {
    if (this.state.localStream) {
      this.state.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  handleTimeUp = () => {
    // Called when the time is up
    // Set isTimeUp to true
    console.log("Timer has ended. Stopping camera.");
    this.setState({ isTimeUp: true });

    // Show the modal when time is up
    this.openModal();

    // Stop the webcam
    this.stopWebCam();
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className="App">
        <div className="timer-container">
          <Timer onTimeUp={this.handleTimeUp} />
        </div>
        <div className="video-container">
          {this.state.localStream && (
            <video
              autoPlay
              ref={(video) => {
                if (video) {
                  video.srcObject = this.state.localStream;
                }
              }}
              className="video"
            />
          )}
          {/* Embed Google Form */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfPCdTm1_rJmcAvh8EmwCuaijVPPorYDi7UQZR95bICIMlNKg/viewform?embedded=true"
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
        {this.state.isModalOpen && (
          <TimeUpModal onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default ExamWindow;

