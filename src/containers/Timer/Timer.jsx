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
    const [permission, setPermission] = useState(false);
    const [streak, setStreak] = useState(-1);
    useImperativeHandle(
      _ref,
      () => ({
        getState: () => {
          return timerState;
        },
      }),
      [timerState]
    );

    useEffect(() => {
      document.title = "Pomodoro timer - " + getFormattedTime();
    }, [seconds]);

    const soundElem = useRef();

    useEffect(() => {
      if (!window.Notification) {
        console.log("Browser does not support notifications.");
      } else {
        if (Notification.permission !== "default") {
          Notification.requestPermission().then((p) => {
            if (p === "granted") {
              setPermission(true);
              const notify = new Notification("Hello!", {
                body: "You will receive a notification when the time is up!",
                icon: "",
              });
            } else {
              setPermission(false);
            }
          });
        } else {
          setPermission(Notification.permission == "denied" ? false : true);
        }
      }
    }, []);

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
                notification("Well done, you can rest now.");
                setStreak(streak + 1);
                setMinutes(breakTime);
                setTimerState(4);
              }, 1000);
            } else {
              setTimeout(() => {
                notification("Time to work, stay hard!");
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

    const notification = (text) => {
      if (permission) {
        const notify = new Notification(text, {
          body: "- David Goggins",
          icon: "data:image/jpeg;base64,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",
        });
      }
    };

    useEffect(() => {
      console.log(timerState);
      /*
      0 - initial state
      1 - focus time paused
      2 - pause time paused
      3 - focus time running 
      4 - pause running */
      if (timerState == 0 && isRunning) {
        setTimerState(3);
        setStreak(0)
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
          {streak == -1 ? getLabel() : getLabel() + " #" + streak}
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
