import "./timerbox.scss";
import { useState, useEffect, useRef } from "react";
import Timer from "../Timer/Timer";
import LengthSetter from "../LengthSetter/LengthSetter";

const TimerBox = ({ minutes, seconds, setMinutes, setSeconds }) => {
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);

  const timerState = useRef();

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

  const getBackgroundColor = () => {
    if (isRunning) {
      console.log(timerState.current.getState());
      if (timerState.current.getState() == 3) {
        return "sessionCol";
      } else if (timerState.current.getState() == 4) {
        return "breakCol";
      } else {
        return "pauseCol";
      }
    } else {
      return "pauseCol";
    }
  };
  const classes = `timerBox ${getBackgroundColor()}`;

  return (
    <div
      className={classes}
      style={{
        transition: "all .8s ease",
      }}
    >
      <div className="box">
        <Timer
          ref={timerState}
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
          <LengthSetter
            name={"break"}
            time={breakTime}
            setTime={setBreakTime}
            isRunning={isRunning}
          />
          <LengthSetter
            name={"session"}
            time={sessionTime}
            setTime={setSessionTime}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerBox;
