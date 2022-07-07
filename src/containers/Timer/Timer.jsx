import "./timer.scss";
import { useState, useEffect, useRef } from "react";

const Timer = ({
  minutes,
  seconds,
  isRunning,
  setMinutes,
  setSeconds,
  setIsRunning,
  handleReset,
  breakTime,
  sessionTime,
}) => {
  const [timerState, setTimerState] = useState(0);
  const soundElem = document.getElementById("beep");

  const audioElem = useRef(new Audio(`../../sounds/beep.wav`));

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (seconds == 0 && minutes == 0) {
          playSound();
          if (timerState == 3) {
            setTimeout(() => {
              setMinutes(breakTime);
              setTimerState(4);
            }, 1000);
          } else {
            setTimeout(() => {
              setMinutes(sessionTime);
              setTimerState(3);
            }, 1000);
          }
          setSeconds = 0;
        } else if (seconds <= 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  const playSound = () => {
    if(soundElem){
            soundElem.currentTime = 0;
    soundElem.play();
    }

  };

  const stopSound = () => {
    if(soundElem){
            soundElem.currentTime = 0;
    soundElem.pause();
    }

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
    //console.log(s);
    return s;
  };

  const getLabel = () => {
    switch (timerState) {
      case 0:
        return "Press start to begin";
      case 1:
        return "Session paused";
      case 2:
        return "Break paused";
      case 3:
        return "Time to focus";
      case 4:
        return "Enjoy the break";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (timerState == 0 && isRunning) {
      setTimerState(3);
      return;
    } else if (timerState == 0 && !isRunning) {
      return;
    }
    if (!isRunning) {
      timerState == 3 ? setTimerState(1) : setTimerState(2);
    } else {
      timerState == 1 ? setTimerState(3) : setTimerState(4);
    }
  }, [isRunning]);

  return (
    <div>
      <h1>Session</h1>
      <div id="time-left">{getFormattedTime()}</div>
      <h3 id="timer-label">{getLabel()}</h3>
      <button
        id="start_stop"
        onClick={() => {
          setIsRunning(!isRunning);
        }}
      >
        {isRunning ? "pause" : "start"}
      </button>
      <button
        id="reset"
        onClick={() => {
          handleReset();
          setTimerState(0);
          stopSound();
        }}
      >
        {" "}
        reset
      </button>
      <audio ref={audioElem} autoPlay src={require(`../../sounds/beep.wav`)} id="beep"></audio>
    </div>
  );
};

export default Timer;
