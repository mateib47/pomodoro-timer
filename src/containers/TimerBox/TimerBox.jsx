import "./timerbox.scss";
import { useState } from "react";

const TimerBox = ({
  minutes,
  seconds,
  hours,
  setMinutes,
  setSeconds,
  setHours,
}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  return (
    <div className="timerBox">
      <div className="time">{"" + hours + ":" + minutes + ":" + seconds}</div>
      <div className="wrapper">
        <div className="break">
          <h1 id="break-label">Break Lenght</h1>
          <h2>{breakTime}</h2>
          <button
            id="breal-decrement"
            onClick={() => {
              setBreakTime(breakTime - 1);
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
          <h1 id="session-label">Session Lenght</h1>
          <h2>{sessionTime}</h2>
          <button
            id="session-decrement"
            onClick={() => {
              setSessionTime(sessionTime - 1);
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
