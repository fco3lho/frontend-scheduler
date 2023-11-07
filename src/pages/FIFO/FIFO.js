import "./FIFO.css";
import homeIcon from "./vector.svg";

//Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

const FifoScheduler = () => {
  const [processes, setProcesses] = useState([]);
  let numberOfProcesses = 0;
  let time = 0;
  let totalTime = 0;
  let simulate = [{}];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function countProcesses() {
    const arrayIDs = [];

    for (var i = 0; i < processes.length; i++) {
      if (!arrayIDs.includes(processes[i].processID)) {
        arrayIDs.push(processes[i].processID);
      }
    }

    numberOfProcesses = arrayIDs.length;
  }

  useEffect(() => {
    Axios.get("http://localhost:3003/api/firstInFirstOut")
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response);
      });
  }, []);

  const handleSimulate = async () => {
    countProcesses();

    for (var i = 0; i < processes.length; i++) {
      time = 0;

      for (var j = 0; j < processes[i].totalQuantum; j++) {
        await sleep(100);

        if (j % 1 === 0) {
          time = time + 1;
          totalTime = totalTime + 1;

          console.clear();

          console.log("Processo sendo executado: ", processes[i].processID);
          console.log("Tempo do processo ", processes[i].processID, ": ", time);
          console.log("Tempo total de processamento: ", totalTime);
          console.log("\n");
        }
      }
    }
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

      <div className="element-container">
        {/* {processes.length > 0 &&
                  processes.map((item, index) => (
                      <div className="element" key={index}>
                          <p>
                              <strong>processID: {item.processID}</strong>
                          </p>
                          {item.ended ? <p>ended: true</p> : <p>ended: false</p>}
                          <p>executionTime: {item.executionTime}</p>
                          <p>fullExecutionTime: {item.fullExecutionTime}</p>
                          <p>idleTime: {item.idleTime}</p>
                          <p>totalQuantum: {item.totalQuantum}</p>
                      </div>
                  ))} */}
          
      </div>
    </div>
  );
};

export default FifoScheduler;
