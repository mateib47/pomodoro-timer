import "./lengthSetter.scss";

const LengthSetter = ({ name, time, setTime, isRunning }) => {
  const classes = `${name} lengthSetter`;
  return (
    <div className={classes}>
      <h3 id={name + "-label"}>
        {name.charAt(0).toUpperCase() + name.slice(1) + " Length"}
      </h3>
      <div className="row">
        <button
          id={name + "-decrement"}
          onClick={() => {
            if (time > 1 && !isRunning) setTime(time - 1);
          }}
        >
          -
        </button>
        <h4 id={name + "-length"}>{time}</h4>
        <button
          id={name + "-increment"}
          onClick={() => {
            if (time < 60 && !isRunning) setTime(time + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LengthSetter;
