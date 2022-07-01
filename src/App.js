import "./app.scss";
import TimerBox from "./containers/TimerBox/TimerBox";
import Topbar from "./containers/Topbar/Topbar";
import { useState, useEffect } from "react";



const App = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//    if (seconds <= 0){
//     setSeconds(59);
//     setMinutes(minutes-1);
//    }
   
// }, [seconds]);

  return (
    <div className="app">
      <Topbar />
      <div className="section">
        <TimerBox
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setIsRunning={setIsRunning}
        />
      </div>
    </div>
  );
};

export default App;
