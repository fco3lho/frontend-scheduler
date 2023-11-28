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
  const [winnerTicket, setWinnerTicket] = useState(0);
  
	const [numberOfProcesses, setNumberOfProcesses] = useState(0);
	const [processes, setProcesses] = useState([]);
	const [selectedProcess, setSelectedProcess] = useState();

  const [boolForSimulate, setBoolForSimulate] = useState();

        //Form
        const [from_value, setFrom_value] = useState(10);
        const [to_value, setTo_value] = useState(20);
        const [cpu_weigth, setCpu_weigth] = useState(0.5);
        const [memory_weigth, setMemory_weigth] = useState(0.3);
        const [io_weight, setIo_weight] = useState(0.2);
		const [lottery_type, setLottery_type] = useState(['random', 'priority', 'equal']);
    const [dataset, setDataset] = useState(0);
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
            simulation[index].execTimeIteration === ""
              ? "-"
              : simulation[index].execTimeIteration;
      
          arrayProcesses[simulation[index].processID - 1].idleTimeIteration =
            simulation[index].idleTimeIteration === ""
              ? "-"
              : simulation[index].idleTimeIteration;
      
          arrayProcesses[simulation[index].processID - 1].processEnded =
            simulation[index].processEnded;
      
          arrayProcesses[simulation[index].processID - 1].processTimeRemaining =
            simulation[index].processTimeRemaining;
      
          arrayProcesses[simulation[index].processID - 1].quantum =
            simulation[index].quantum;
      
          arrayProcesses[simulation[index].processID - 1].totalExecTime =
            simulation[index].totalExecTime === ""
              ? "-"
              : simulation[index].totalExecTime;
      
          arrayProcesses[simulation[index].processID - 1].totalIdleTime =
            simulation[index].totalIdleTime === ""
              ? "-"
              : simulation[index].totalIdleTime;
      
          if (simulation[index].processEnded)
            arrayProcesses[simulation[index].processID - 1].fullTimeInExecution =
              simulation[index].fullTimeInExecution;
      
          setSelectedProcess(simulation[index].processID);
          setProcesses(arrayProcesses);
        };
      
        useEffect(() => {
          if (dataset === 0) {
            Axios.get(
              `http://localhost:3001/api/lottery/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}/${lottery_type[x]}`
            )
              .then((response) => {
                countProcesses(response.data);
                setSimulation(response.data);
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }
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
            `http://localhost:3001/api/lottery/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}/${lottery_type[x]}`
          )
            .then((response) => {
              countProcesses(response.data);
              setSimulation(response.data);
            })
            .catch((error) => {
              console.log(error.response.data);
            });

            setBoolForSimulate(true);
      
          for (let i = 0; i < simulation.length; i++) {
            await sleep(250);
            changeSpecificProcess(i);
            setFullTimeInExecution(simulation[i].fullTimeInExecution);
            setWinnerTicket(simulation[i].winnerTicket);
          }
      
          setSelectedProcess(-1);
        };

        useEffect(() => {
          if (boolForSimulate) {
            (async () => {
              for (let i = 0; i < simulation.length; i++) {
                await sleep(200);
                
              }
              setBoolForSimulate(false);
            })();
          }
        }, [boolForSimulate === true]);
      
  return (
      <div className="schedule-page-lot">
          <div className="text" />
          <div className="schedule-lot">Loteria</div>
          <Link to="/">
        <div className="schedule-page-child-FIFO" />
        <img className="schedule-vector-icon-FIFO" alt="" src={homeIcon} />
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
        <label className="schedule_dataset">
          <span>Insira a carga de dados (Opcional): </span>
          <br />
          <textarea
            cols="32"
            rows="24"
            onChange={(e) => setDataset(e.target.value)}
            placeholder={`Exemplo com 3 processos:
[
  {
      "type": "cpu",
      "time": 80,
      "priority": null,
      "execTime": 0,
      "user_id": null
  },
  {
      "type": "cpu",
      "time": 152,
      "priority": null,
      "execTime": 0,
      "user_id": null
  },
  {
      "type": "cpu",
      "time": 87,
      "priority": null,
      "execTime": 0,
      "user_id": null
  }
]`}
          ></textarea>
        </label>
        <div className="ButtonsContainer">
          <button   disabled={boolForSimulate} onClick={()=>setX(0)} >Randômico</button>
            <button disabled={boolForSimulate} onClick={()=>setX(1)} >Prioritário</button>
            <button disabled={boolForSimulate} onClick={()=>setX(2)} >Igualitário</button>
    </div>
      </form>
	  <h1 className="totalTime-lot">
        <strong>Tempo total: </strong> {fullTimeInExecution} ut
      </h1>

      <h1 className="ticket-lot">
  <strong>Ticket sorteado: </strong> 
  <span className="winner-ticket">{winnerTicket}</span>
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