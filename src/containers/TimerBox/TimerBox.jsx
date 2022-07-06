import "./timerbox.scss";
import { useState, useEffect } from "react";
import Timer from "../Timer/Timer";
import LengthSetter from "../LengthSetter/LengthSetter";

const TimerBox = ({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);
  

  useEffect(() => {
    setSeconds(0);
    setMinutes(sessionTime);
  }, [sessionTime]);


  const handleReset = () => {
    setIsRunning(false);
    setBreakTime(5);
    setSessionTime(25);
    setMinutes(25);
    setSeconds(0);
  };
 

  return (
    <div className="timerBox">
      <Timer
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setIsRunning={setIsRunning}
        handleReset={handleReset}
        breakTime={breakTime}
        sessionTime={sessionTime}
      />
      <div className="wrapper">
        <LengthSetter name={"break"}  time={breakTime} setTime={setBreakTime} isRunning={isRunning} />
        <LengthSetter name={"session"}  time={sessionTime} setTime={setSessionTime} isRunning={isRunning} />

      </div>
    </div>
  );
};

export default TimerBox;
