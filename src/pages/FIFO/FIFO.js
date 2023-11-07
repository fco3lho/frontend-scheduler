import "./FIFO.css";
import homeIcon from "./vector.svg";

//Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

const FifoScheduler = () => {
  const [data, setData] = useState([]);
  let numberOfProcesses = 0;
  let totalTime = 0;
  let scheduleQuantum = 100;
  let processes = [];

  let finishedProcesses = [];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function countProcesses() {
    const arrayIDs = [];

    for (var i = 0; i < data.length; i++) {
      if (!arrayIDs.includes(data[i].processID)) {
        arrayIDs.push(data[i].processID);
      }
    }

    numberOfProcesses = arrayIDs.length;
  }

  useEffect(() => {
    Axios.get("http://localhost:3003/api/firstInFirstOut")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response);
      });
  }, []);

  const handleSimulate = async () => {
    countProcesses();
    totalTime = 0;

    //Seleciona processo para executar
    for (var i = 0; i < numberOfProcesses; i++) {
      //Verificar número máximo de processos no array
      if (processes.length < numberOfProcesses) {
        processes.push({
          id: data[i].processID,
          ended: data[i].ended,
          quantum: data[i].totalQuantum,
          time: 0,
        });
      }

      //Gasta o quantum do escalonador para executar o processo
      for (var j = 0; j < scheduleQuantum; j++) {
        await sleep(1);

        //Se o tempo executado do processo for maior ou igual ao quantum que o mesmo precisa, ele é finalizado
        if (processes[i].time >= processes[i].quantum) {
          if (!finishedProcesses.includes(i)) finishedProcesses.push(i);
          processes[i].ended = true;
          j = scheduleQuantum;
          break;
        }
        //Se o processo não foi concluído, continua a ser processado
        else if (!processes[i].ended) {
          totalTime = totalTime + 1;
          processes[i].time = processes[i].time + 1;
        }
      }

      // Verifica se todos os processos foram executados
      if (finishedProcesses.length === 20) {
        console.log("Escalonamento finalizado no tempo de ", totalTime, "ms.");
        break;
      }

      // Se todos os processos ainda não foram executados, reexecutar loop
      if (i == 19) i = 0;
    }

    console.log("Array com processos em ordem de finalização: ", finishedProcesses);
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

      <div className="element-container">
        {/* {processes.length > 0 &&
          processes.map((process, index) => (
            <div className="element" key={index}>
              <p>Process ID: {process.id}</p>
              <p>Finished: {process.ended ? <>Yes</> : <>No</>}</p>
              <p>Tempo do processo: {time}</p>
              <p>Tempo total: {totalTime}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default FifoScheduler;
