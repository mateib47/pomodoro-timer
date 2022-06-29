import "./app.scss";
import TimerBox from "./containers/TimerBox/TimerBox";
import Topbar from "./containers/Topbar/Topbar";
import { useState, useEffect } from "react";



const App = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(20);
  const [hours, setHours] = useState(0);

  useEffect(() => {
   if (seconds <= 0){
    setSeconds(59);
    setMinutes(minutes-1);
   }
   
}, [seconds]);

  return (
    <div className="app">
      <Topbar />
      <div className="section">
        <TimerBox
          minutes={minutes}
          seconds={seconds}
          hours={hours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setHours={setHours}
        />
      </div>
    </div>
  );
};

export default App;
