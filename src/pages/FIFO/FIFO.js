import "./FIFO.css";
import homeIcon from "./vector.svg";

//Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

const FifoScheduler = () => {
  const [processes, setProcesses] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState();
  let numberOfProcesses = 0;
  let totalTime = 0;
  let scheduleQuantum = 100;

  let finishedProcesses = [];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function countProcesses(data) {
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
        countProcesses(response.data);

        let arrayTemp = [...processes];

        for (var i = 0; i < numberOfProcesses; i++) {
          arrayTemp.push({
            id: response.data[i].processID,
            ended: response.data[i].ended,
            quantum: response.data[i].totalQuantum,
            time: 0,
          });

          if (processes.length < numberOfProcesses) {
            setProcesses(arrayTemp);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response);
      });
  }, [processes]);

  const changeProcessToFinished = (id) => {
    const newArray = [...processes];

    const changedObject = newArray.find((object) => object.id === id);

    if (changedObject) {
      changedObject.ended = true;
      setProcesses(newArray);
    }
  };

  const increaseProcessTick = (id) => {
    const newArray = [...processes];

    const changedObject = newArray.find((object) => object.id === id);

    if (changedObject) {
      changedObject.time = changedObject.time + 1;
      setProcesses(newArray);
    }
  };

  const handleSimulate = async () => {
    totalTime = 0;

    //Seleciona processo para executar
    for (var i = 0; i < numberOfProcesses; i++) {
      //Gasta o quantum do escalonador para executar o processo
      for (var j = 0; j < scheduleQuantum; j++) {
        await sleep(10);

        //Se o tempo executado do processo for maior ou igual ao quantum que o mesmo precisa, ele é finalizado
        if (processes[i].time >= processes[i].quantum) {
          if (!finishedProcesses.includes(i)) finishedProcesses.push(i);
          changeProcessToFinished(i + 1);
          j = scheduleQuantum;
          break;
        }
        //Se o processo não foi concluído, continua a ser processado
        else if (!processes[i].ended) {
          setSelectedProcess(processes[i].id);
          totalTime = totalTime + 1;
          increaseProcessTick(i + 1);
        }
      }

      // Verifica se todos os processos foram executados
      if (finishedProcesses.length === numberOfProcesses) {
        console.log("Escalonamento finalizado no tempo de ", totalTime, "ms.");
        break;
      }

      // Se todos os processos ainda não foram executados, reexecutar loop
      if (i == numberOfProcesses - 1) i = 0;
    }

    console.log(
      "Array com processos em ordem de finalização: ",
      finishedProcesses
    );
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
        <strong>Tempo total:</strong> {totalTime}
      </h1>

      <div className="element-container">
        {processes.map((process, index) => (
          <div
            className={
              process.ended
                ? "element_finished"
                : selectedProcess === process.id
                ? "element_selected"
                : "element"
            }
            key={index}
          >
            <p>
              <strong>Process ID:</strong> {process.id}
            </p>
            <p>
              <strong>Finished:</strong> {process.ended ? <>Yes</> : <>No</>}
            </p>
            <p>
              <strong>Tempo do processo:</strong> {process.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FifoScheduler;
