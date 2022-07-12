import "./timer.scss";
import { useState, useEffect, useRef, forwardRef } from "react";
import { useImperativeHandle } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const Timer = forwardRef(
  (
    {
      minutes,
      seconds,
      isRunning,
      setMinutes,
      setSeconds,
      setIsRunning,
      handleReset,
      breakTime,
      sessionTime,
    },
    _ref
  ) => {
    const [timerState, setTimerState] = useState(0);
    //const soundElem = document.getElementById("beep");

    useImperativeHandle(
      _ref,
      () => ({
        getState: () => {
          return timerState;
        },
      }),
      [timerState]
    );

    const soundElem = useRef();

    useEffect(() => {
      if (seconds == 0 && minutes == 0) {
        playSound();
      }
    });

    useEffect(() => {
      if (isRunning) {
        const timer = setTimeout(() => {
          if (seconds == 0 && minutes == 0) {
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
      if (soundElem.current) {
        let playPromise = soundElem.current.play();

        if (playPromise !== undefined) {
          soundElem.current.currentTime = 0;
          playPromise.then((_) => {}).catch((error) => {});
        }
      }
    };

    const stopSound = () => {
      if (soundElem.current) {
        soundElem.current.currentTime = 0;
        soundElem.current.pause();
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
      <div className="timer">
        <Typography id="time-left" variant="h1" sx={{ overflow: "hidden" }}>
          {getFormattedTime()}
        </Typography>
        <Typography id="timer-label" variant="subtitle1">
          {getLabel()}
        </Typography>
        <IconButton
          id="start_stop"
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {!isRunning ? (
            <PlayArrowIcon sx={{ fontSize: "45px" }} />
          ) : (
            <PauseIcon sx={{ fontSize: "45px" }} />
          )}
        </IconButton>
        <IconButton
          id="reset"
          onClick={() => {
            handleReset();
            setTimerState(0);
            stopSound();
          }}
        >
          <RestartAltIcon sx={{ fontSize: "45px" }} />
        </IconButton>
        <audio
          ref={soundElem}
          autoPlay
          src={require(`../../sounds/beep2.mp3`)}
          id="beep"
        ></audio>
      </div>
    );
  }
);

export default Timer;
