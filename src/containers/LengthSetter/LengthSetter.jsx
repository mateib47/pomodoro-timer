import "./lengthSetter.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const LengthSetter = ({ name, time, setTime, isRunning }) => {
  const classes = `${name} lengthSetter`;
  return (
    <div className={classes}>
      <Typography id={name + "-label"} variant="h5">
        {name.charAt(0).toUpperCase() + name.slice(1) + " Length"}
      </Typography>
      <div className="row">
        <IconButton
          disabled={isRunning ? true : false}
          id={name + "-decrement"}
          onClick={() => {
            if (time > 1 && !isRunning) setTime(time - 1);
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography id={name + "-length"}>{time}</Typography>
        <IconButton
          disabled={isRunning ? true : false}
          id={name + "-increment"}
          onClick={() => {
            if (time < 60 && !isRunning) setTime(time + 1);
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default LengthSetter;
