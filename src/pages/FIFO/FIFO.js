import "./FIFO.css";
import homeIcon from "./vector.svg";

//Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components
import BlockProcess from "../../components/BlockProcess/BlockProcess";

//Axios
import Axios from "axios";

const FifoScheduler = () => {
  const [simulation, setSimulation] = useState();
  const [fullTimeInExecution, setFullTimeInExecution] = useState(0);

  const [numberOfProcesses, setNumberOfProcesses] = useState(0);
  const [processes, setProcesses] = useState([]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function countProcesses(data) {
    const arrayIDs = [];

    for (let i = 0; i < data.length; i++) {
      if (!arrayIDs.includes(data[i].processID)) {
        arrayIDs.push(data[i].processID);
      }
    }

    setNumberOfProcesses(arrayIDs.length);
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/firstInFirstOut")
      .then((response) => {
        countProcesses(response.data);
        setSimulation(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    let arrayProcesses = [];

    for (let i = 0; i < numberOfProcesses; i++) {
      arrayProcesses.push({
        processID: i + 1,
        action: "stopped",
        execTimeIteration: 0,
        idleTimeIteration: 0,
        processEnded: false,
        processTimeRemaining: 0,
        quantum: 0,
        totalExecTime: 0,
        totalIdleTime: 0,
      });
    }

    setProcesses(arrayProcesses);
  }, [numberOfProcesses]);

  const handleSimulate = async () => {
     console.log(processes);
  };

  return (
    <div className="schedule-page">
      <div className="text" />
      <div className="schedule-first-in-first">First In First Out</div>
      <Link to="/">
        <div className="schedule-page-child" />
        <img className="schedule-vector-icon" alt="" src={homeIcon} />
      </Link>
      <Link>
        <div className="frame-parentschedule" onClick={handleSimulate}>
          <svg
            width="22"
            height="25"
            viewBox="0 0 22 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z"
              fill="white"
            />
          </svg>
          <div className="schedule-escalonar">Escalonar</div>
        </div>
      </Link>

      <h1 className="totalTime">
        <strong>Tempo total:</strong> {fullTimeInExecution} ms
      </h1>

      <div className="element-container">
        {processes.map((process, index) => (
          <BlockProcess
            key={index}
            id={process.processID}
            ended={process.processEnded}
            action={process.action}
            quantum={process.quantum}
            execTimeIteration={process.execTimeIteration}
            idleTimeIteration={process.idleTimeIteration}
            processTimeRemaining={process.processTimeRemaining}
            totalExecTime={process.totalExecTime}
            totalIdleTime={process.totalIdleTime}
          />
        ))}
      </div>
    </div>
  );
};

export default FifoScheduler;
