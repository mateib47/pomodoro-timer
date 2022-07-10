import "./app.scss";
import TimerBox from "./containers/TimerBox/TimerBox";
import Topbar from "./containers/Topbar/Topbar";
import { useState, useEffect } from "react";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);

  return (
    <div className="app">
      <Topbar />
      <div className="section">
        <TimerBox
          minutes={minutes}
          seconds={seconds}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
      </div>
    </div>
  );
};

export default App;
