import "./timerbox.scss";
import { useState, useEffect, useRef } from "react";
import Timer from "../Timer/Timer";
import LengthSetter from "../LengthSetter/LengthSetter";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const TimerBox = ({ minutes, seconds, setMinutes, setSeconds }) => {
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);
  const [volume, setVolume] = useState(50);

  const changeVolume = (event, newValue) => {
    setVolume(newValue);
  };

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

          <Box sx={{ width: 200 }}>
            <Typography id="sound-label" variant="h5">
              Notification Sound
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={changeVolume}
                sx={{
                  color: "#403d3d",
                  padding: "30px 0",
                  "& .MuiSlider-thumb": {
                    overflow: "hidden",
                    width: "12px",
                    height: "12px",
                    margin: "0 6px",
                  },
                }}
              />
              <VolumeUp />
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TimerBox;
