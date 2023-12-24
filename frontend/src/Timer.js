import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: props.testDuration,
      values: props
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          // Call the onTimeUp callback when the timer reaches 0
          this.props.onTimeUp();
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="timer">
        {minutes === 0 && seconds === 0 ? (
          <div>Time's up!</div>
        ) : (
          <div>
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        )}
      </div>
    );
  }
}

export default Timer;
