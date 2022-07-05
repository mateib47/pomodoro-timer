import "./app.scss";
import TimerBox from "./containers/TimerBox/TimerBox";
import Topbar from "./containers/Topbar/Topbar";
import { useState, useEffect } from "react";



const App = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);


//   useEffect(() => {
//    if (seconds <= 0){
//     setSeconds(59);
//     setMinutes(minutes-1);
//    }
   
// }, [seconds]);
useEffect(() => {
  let btn = document.getElementById("session-increment");
  btn.addEventListener("click", inc);

  return () => {
    btn.removeEventListener("click", inc)
  }
})

async function inc() {

  await incr();

}//fix

const incr = () =>{
  return new Promise(resolve => {
    setTimeout(() => {
      setSessionTime(sessionTime + 1);
              console.log("btn click");
    }, 100);
  });
}


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
          setSessionTime={setSessionTime}
          sessionTime={sessionTime}
        />
        <div className="session">
          <h3 id={"session-label"}>Session Length</h3>
          <h4 id={"session-length"}>{sessionTime}</h4>
          <button
            id={"session-decrement"}
            onClick={() => {
              if (sessionTime > 0 && !isRunning) setSessionTime(sessionTime - 1);
            }}
          >
            -
          </button>
          <button
            id={"session-increment"}

          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
