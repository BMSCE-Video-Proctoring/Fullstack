import React from "react";
import "./TimeUpModal.css"; 

class TimeUpModal extends React.Component {

    handleCloseAndRedirect = () => {
        // Call the onClose callback if provided
        if (this.props.onClose) {
          this.props.onClose();
        }
    
        window.location.replace('/');
      };

    render() {
        return (
        <div className="modal">
            <div className="modal-content">
            <h2>Time's Up!</h2>
            <p>Your time for the exam has expired.</p>
            <button onClick={this.handleCloseAndRedirect}>Close</button>
            </div>
        </div>
        );
    }
}

export default TimeUpModal;
