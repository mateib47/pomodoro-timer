import "./timerbox.scss";
import { useState, useEffect } from "react";

const TimerBox = ({
  minutes,
  seconds,
  isRunning,
  setMinutes,
  setSeconds,
  setIsRunning,
}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [isSession, setIsSession] = useState(true);

  const handleReset = () => {
    setIsRunning(false);
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

  useEffect(() => {
    if (isRunning){
        const timer = setTimeout(() => {
            if (seconds == 0 && minutes == 0){
                setMinutes(breakTime);
                setSeconds = 0;
                setIsSession(!isSession);
            }
           else if (seconds <= 0) {
              setSeconds(59);
              setMinutes (minutes - 1);
            } else {
              setSeconds(seconds - 1);
            }
          }, 1000);
      
          return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    setSeconds(0);
    setMinutes(sessionTime);
  }, [sessionTime])
  

  const startTimer = () => {
    setIsRunning(true);
    for (let i = 0; i < 20; i++) {
      console.log(i);
      setTimeout(function () {
        console.log(i);

        if (seconds <= 0) {
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000 * i);
    }
  };

  return (
    <div className="timerBox">
      <div id="timer-label">
        <h1>Session</h1>
        <div id="time-left">{getFormattedTime()}</div>
        <h3 id="timer-label">{isSession && isRunning ? "Session has begun" : "Break has begun"}</h3>
        <button
          id="start_stop"
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {" "}
          start / stop
        </button>
        <button
          id="reset"
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
              if (breakTime > 0 && !isRunning) setBreakTime(breakTime - 1);
            }}
          >
            -
          </button>
          <button
            id="break-increment"
            onClick={() => {
                if (breakTime < 60 && !isRunning) setBreakTime(breakTime + 1);
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
              if (sessionTime > 0 && !isRunning) setSessionTime(sessionTime - 1);
            }}
          >
            -
          </button>
          <button
            id="session-increment"
            onClick={() => {
                if (sessionTime < 60 && !isRunning) setSessionTime(sessionTime + 1);
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
