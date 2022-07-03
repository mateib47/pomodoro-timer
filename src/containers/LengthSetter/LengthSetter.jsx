import './lengthSetter.scss'

const LengthSetter = ({name, time, setTime, isRunning}) => {
  return (
    <div className={name}>
          <h3 id={name + "-label"}>{name.charAt(0).toUpperCase() + name.slice(1) + " Length"}</h3>
          <h4 id={name + "-length"}>{time}</h4>
          <button
            id={name + "-decrement"}
            onClick={() => {
              if (time > 0 && !isRunning) setTime(time - 1);
            }}
          >
            -
          </button>
          <button
            id={name +"-increment"}
            onClick={() => {
              if (time < 60 && !isRunning) setTime(time + 1);
            }}
          >
            +
          </button>
        </div>
  )
}

export default LengthSetter