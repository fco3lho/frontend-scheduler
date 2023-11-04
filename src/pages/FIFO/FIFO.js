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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var time = 0;
  var totalTime = 0;

  const handleClick = async() => {
    for (var i = 0; i < processes.length; i++) {
      // console.log("EXECUÇÃO DE NÚMERO ", i + 1);
      // console.log("\nPID: ", processes[i].processID);
      // console.log("\nTempo de execução: ", processes[i].executionTime);
      // console.log("\nTempo de idle: ", processes[i].idleTime);
      // console.log("\nTempo total de Quantum: ", processes[i].totalQuantum);
      // console.log("\nExecução do processo finalizada: ", processes[i].ended);
      // console.log(
      //   "\nTempo total de execução: ",
      //   processes[i].fullExecutionTime
      // );
      // console.log("\n\n");

      time = 0;

      for (var j = 0; j < processes[i].totalQuantum; j++) {
        await sleep(10);

        if(j % 1 === 0){
          time = time + 1;
          totalTime = totalTime + 1;

          console.log("Processo sendo executado: ", processes[i].processID);
          console.log("Tempo de execução do processo ", processes[i].processID, ": ", time);
          console.log("Tempo total de processamento: ", totalTime);
          console.log("\n");
        }
      }
    }
  };

  return (
    <div className="fifo-scheduler">
      <button onClick={handleClick}>Clique aqui</button>
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
