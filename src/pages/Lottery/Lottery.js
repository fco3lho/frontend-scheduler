import React, {useState} from 'react';
import {Link} from "react-router-dom";
import homeIcon from "../FIFO/vector.svg";
import './Lottery.css'
import Axios from "axios";
import { useEffect } from "react";

import BlockProcess from "../../components/BlockProcess/BlockProcess";


const Lottery = () => {

	const [simulation, setSimulation] = useState([]);
	const [fullTimeInExecution, setFullTimeInExecution] = useState(0);
  
	const [numberOfProcesses, setNumberOfProcesses] = useState(0);
	const [processes, setProcesses] = useState([]);
	const [selectedProcess, setSelectedProcess] = useState();

        //Form
        const [from_value, setFrom_value] = useState(10);
        const [to_value, setTo_value] = useState(20);
        const [cpu_weigth, setCpu_weigth] = useState(0.5);
        const [memory_weigth, setMemory_weigth] = useState(0.3);
        const [io_weight, setIo_weight] = useState(0.2);
		const [lottery_type, setLottery_type] = useState(['random', 'priority', 'equal']);
        const [x, setX] = useState(0);

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
      
          arrayProcesses[simulation[index].processID - 1].processID =
            simulation[index].processID;
          arrayProcesses[simulation[index].processID - 1].action =
            simulation[index].action;
          arrayProcesses[simulation[index].processID - 1].execTimeIteration =
            simulation[index].execTimeIteration;
          arrayProcesses[simulation[index].processID - 1].idleTimeIteration =
            simulation[index].idleTimeIteration;
          arrayProcesses[simulation[index].processID - 1].processEnded =
            simulation[index].processEnded;
          arrayProcesses[simulation[index].processID - 1].processTimeRemaining =
            simulation[index].processTimeRemaining;
          arrayProcesses[simulation[index].processID - 1].quantum =
            simulation[index].quantum;
          arrayProcesses[simulation[index].processID - 1].totalExecTime =
            simulation[index].totalExecTime;
          arrayProcesses[simulation[index].processID - 1].totalIdleTime =
            simulation[index].totalIdleTime;
      
          setSelectedProcess(simulation[index].processID);
          setProcesses(arrayProcesses);
        };
      
        useEffect(() => {
          Axios.get(
            `http://localhost:3001/api/lottery/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/0/${lottery_type[x]}`
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
			  winnerTicket: 0
            });
          }
      
          setProcesses(arrayProcesses);
          setSelectedProcess(-2);
        }, [numberOfProcesses, selectedProcess === -1]);
      
        const handleSimulate = async (e) => {
          e.preventDefault();
			
          await Axios.get(
            `http://localhost:3001/api/lottery/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/0/${lottery_type[x]}`
          )
            .then((response) => {
              countProcesses(response.data);
              setSimulation(response.data);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
      
          for (let i = 0; i < simulation.length; i++) {
            await sleep(250);
            changeSpecificProcess(i);
            setFullTimeInExecution(simulation[i].fullTimeInExecution);
          }
      
          setSelectedProcess(-1);
        };
      
  return (
      <div className="schedule-page-lot">
          <div className="text" />
          <div className="schedule-lot">Loteria</div>
          <Link to="/">
              <div className="schedule-page-child-lot" />
              <img className="schedule-vector-icon" alt="" src={homeIcon} />
          </Link>
        <form className="schedule_form_lot" onSubmit={handleSimulate} >
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
	<button onClick={()=>setX(0)} >Random</button>
    <button onClick={()=>setX(1)} >Priorio</button>
    <button onClick={()=>setX(2)} >Igual</button>
      </form>
	  <h1 className="totalTime-lot">
        <strong>Tempo total: </strong> {fullTimeInExecution} ut
      </h1>

      <div className="element-container-lot">
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
            selectedProcess={selectedProcess}
			winnerTicket={process.winnerTicket}
          />
        ))}
      </div>
      </div>
  )
}

export default Lottery