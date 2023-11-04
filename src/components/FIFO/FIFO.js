import React, { useState, useEffect } from "react";
import "./FIFO.css";

import Axios from "axios";

const FifoScheduler = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3003/api/firstInFirstOut")
      .then((response) => {
        setProcesses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response);
      });
  }, []);

  const handleClick = () => {
    setProcesses((prevProcesses) => [
      ...prevProcesses.slice(1), // Move o primeiro elemento para o final
      prevProcesses[0], // Coloca o primeiro elemento no final
    ]);
  };

  return (
    <div className="fifo-scheduler">
      <button onClick={handleClick}>Escalonar</button>
      <div className="element-container">
        {processes.length > 0 &&
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
          ))}
      </div>
    </div>
  );
};

export default FifoScheduler;
