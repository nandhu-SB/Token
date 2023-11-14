import { useState, useRef } from "react";
import "./App.css";
import clickSound from "./assets/tune3.mp3";
import buttonData from "./Buttons.json";

function App() {
  const [count, setCount] = useState("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const audioRef = useRef(new Audio(clickSound));

  const [isFlickering, setIsFlickering] = useState(false);

  // const buttons = ["NANDHU", "NIPIN", "PRAKASH","SHAGNA"];

  const handleButtonClick = (value: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // audio.pause();
    // audio.currentTime=0;

    // audioRef.current.loop = true;

    audioRef.current.play();
    
    
    setIsFlickering(true);

    setCount(value);

    timeoutRef.current = setTimeout(() => {
      setIsFlickering(false); // Disable the box shadow effect
      setCount("");

      if (audioRef) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 8000);
  };

  return (
    <div className="container">
      <h1>K-DISC</h1>
      <h2 className={isFlickering ? "flickering" : ""}>{count}</h2>
      <div
        className="sub-container
      "
      >
        <section className="assisstant">
  

          {buttonData.assisstant.map((button, index) => (
            <button key={index} onClick={() => handleButtonClick(button.label)}>
              {button.label}
            </button>
          ))}
        </section>
        <section className="office">
   

          {buttonData.office.map((button, index) => (
            <button key={index} onClick={() => handleButtonClick(button.label)}>
              {button.label}
            </button>
          ))}
        </section>
        <section className="persons">

          {buttonData.persons.map((button, index) => (
            <button key={index} onClick={() => handleButtonClick(button.label)}>
              {button.label}
            </button>
          ))}
        </section>

        <br />
        <br />
        {/* <button onClick={() => setCount('')}>CLEAR</button> */}
      </div>
    </div>
  );
}

export default App;
