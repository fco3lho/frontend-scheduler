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
  const [selectedProcess, setSelectedProcess] = useState();

  //Form
  const [from_value, setFrom_value] = useState(10);
  const [to_value, setTo_value] = useState(20);
  const [cpu_weigth, setCpu_weigth] = useState(0.7);
  const [memory_weigth, setMemory_weigth] = useState(0.6);
  const [io_weight, setIo_weight] = useState(0.5);
  const [dataset, setDataset] = useState();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const countProcesses = (data) => {
    const arrayIDs = [];

    for (let i = 0; i < data.length; i++) {
      if (!arrayIDs.includes(data[i].processID)) {
        arrayIDs.push(data[i].processID);
      }
    }

    setNumberOfProcesses(arrayIDs.length);
  };

  const changeSpecificProcess = (index) => {
    const arrayProcesses = [...processes];

    arrayProcesses[simulation[index].processID - 1].processID = simulation[index].processID;
    arrayProcesses[simulation[index].processID - 1].action = simulation[index].action;
    arrayProcesses[simulation[index].processID - 1].execTimeIteration = simulation[index].execTimeIteration === "" ? ("-") : (simulation[index].execTimeIteration);
    arrayProcesses[simulation[index].processID - 1].idleTimeIteration = simulation[index].idleTimeIteration === "" ? ("-") : (simulation[index].idleTimeIteration);
    arrayProcesses[simulation[index].processID - 1].processEnded = simulation[index].processEnded;
    arrayProcesses[simulation[index].processID - 1].processTimeRemaining = simulation[index].processTimeRemaining;
    arrayProcesses[simulation[index].processID - 1].quantum = simulation[index].quantum;
    arrayProcesses[simulation[index].processID - 1].totalExecTime = simulation[index].totalExecTime === "" ? ("-") : (simulation[index].totalExecTime);
    arrayProcesses[simulation[index].processID - 1].totalIdleTime = simulation[index].totalIdleTime === "" ? ("-") : (simulation[index].totalIdleTime);

    if(simulation[index].processEnded) arrayProcesses[simulation[index].processID - 1].fullTimeInExecution = simulation[index].fullTimeInExecution;

    setSelectedProcess(simulation[index].processID);
    setProcesses(arrayProcesses);
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/firstInFirstOut/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}`
    )
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
        fullTimeInExecution: null
      });
    }

    setProcesses(arrayProcesses);
    setSelectedProcess(-2);
  }, [numberOfProcesses, selectedProcess === -1]);

  const handleSimulate = async (e) => {
    e.preventDefault();

    await Axios.get(
      `http://localhost:3001/api/firstInFirstOut/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}`,
      { dataset: dataset }
    )
      .then((response) => {
        countProcesses(response.data);
        setSimulation(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    for (let i = 0; i < simulation.length; i++) {
      await sleep(200);
      changeSpecificProcess(i);
      setFullTimeInExecution(simulation[i].fullTimeInExecution);
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

      <form className="schedule_form" onSubmit={handleSimulate}>
        <label>
          <span>Valor inicial do intervalo randômico para quantum:</span>
          <input
            type="number"
            name="from_value"
            required
            value={from_value}
            onChange={(e) => {
              setFrom_value(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Valor final do intervalo randomico para quantum:</span>
          <input
            type="number"
            name="to_value"
            required
            value={to_value}
            onChange={(e) => {
              setTo_value(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Tempo de execução para CPU:</span>
          <input
            type="number"
            name="cpu_weigth"
            required
            step="0.01"
            min="0.01"
            max="0.99"
            value={cpu_weigth}
            onChange={(e) => {
              setCpu_weigth(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Tempo de execução para memória:</span>
          <input
            type="number"
            name="memory_weigth"
            required
            step="0.01"
            min="0.01"
            max="0.99"
            value={memory_weigth}
            onChange={(e) => {
              setMemory_weigth(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Tempo de execução para Input/Output:</span>
          <input
            type="number"
            name="io_weigth"
            required
            step="0.01"
            min="0.01"
            max="0.99"
            value={io_weight}
            onChange={(e) => {
              setIo_weight(e.target.value);
            }}
          />
        </label>
        <label className="schedule_dataset">
          <span>Insira a carga de dados (Opcional): </span>
          <br />
          <textarea
            cols="32"
            rows="21"
            onChange={(e) => setDataset(e.target.value)}
            placeholder={`"processes":
[
	{
		"type": "cpu",
		"time": 34,
		"priority": 3,
		"execTime": 0
	},
	{
		"type": "io",
		"time": 152,
		"priority": 15,
		"execTime": 0
	},
	{
		"type": "memory",
		"time": 87,
		"priority": 7,
		"execTime": 0
	},
]`}
          ></textarea>
        </label>
        <button>Escalonar</button>
      </form>
      <button
        className="clean_button"
        onClick={() => {
          setSelectedProcess(-1);
          setFullTimeInExecution(0);
        }}
      >
        Limpar
      </button>

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
            fullTimeInExecution={process.fullTimeInExecution}
            selectedProcess={selectedProcess}
          />
        ))}
      </div>
    </div>
  );
};

export default FifoScheduler;
