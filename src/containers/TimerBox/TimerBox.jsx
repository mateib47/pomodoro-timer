import "./timerbox.scss";
import { useState } from "react";

const TimerBox = ({
  minutes,
  seconds,
  // hours,
  setMinutes,
  setSeconds,
  // setHours,
}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setMinutes(25);
    setSeconds(0);
  };

  const getFormattedTime = () => {
    let s = "";
    if (minutes.toString().length == 1) {
      s += "0" + minutes;
    } else {
      s += minutes;
    }
    s += ":";
    if (seconds.toString().length == 1) {
      s += "0" + seconds;
    } else {
      s += seconds;
    }
    return s;
  };

  const startTimer = () => {
    while(minutes > 0){
        setTimeout(function () {
            if (seconds <= 0) {
              setSeconds(59);
            } else {
              setSeconds(seconds - 1);
            }
          }, 1000);
    }
  };

  return (
    <div className="timerBox">
      <div id="timer-label">
        <h1>Session</h1>
        <div id="time-left">{getFormattedTime()}</div>
        <button
          id="start_stop"
          onClick={() => {
            startTimer();
          }}
        >
          {" "}
          start / stop
        </button>
        <button
          id="start_stop"
          onClick={() => {
            handleReset();
          }}
        >
          {" "}
          reset
        </button>
      </div>
      <div className="wrapper">
        <div className="break">
          <h3 id="break-label">Break Lenght</h3>
          <h4 id="break-length">{breakTime}</h4>
          <button
            id="break-decrement"
            onClick={() => {
              if (breakTime > 0) setBreakTime(breakTime - 1);
            }}
          >
            -
          </button>
          <button
            id="break-increment"
            onClick={() => {
              setBreakTime(breakTime + 1);
            }}
          >
            +
          </button>
        </div>
        <div className="session">
          <h3 id="session-label">Session Lenght</h3>
          <h4 id="session-length">{sessionTime}</h4>
          <button
            id="session-decrement"
            onClick={() => {
              if (sessionTime > 0) setSessionTime(sessionTime - 1);
            }}
          >
            -
          </button>
          <button
            id="session-increment"
            onClick={() => {
              setSessionTime(sessionTime + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerBox;
