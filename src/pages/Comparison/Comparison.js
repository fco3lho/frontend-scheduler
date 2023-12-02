import "./Comparison.css";
import homeIcon from "./vector.svg";

//Hooks
import { useState } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

const CompareSchedulers = () => {
    
    const getLastProcess = (data) => {
        return data.at(-1);
    }

    const randomizeLottery = (fifo, priorityQueues, shortestJob, fairShare) => {
        let media = (fifo + priorityQueues + shortestJob + fairShare) / 4;
        media = media + (Math.random() * (200 - 200) + (-200));

        let output = {
            'fullTimeInExecution': parseInt(media),
            'type': 'lottery'
        }

        return output;
    }

    const orderArrayOfTimes = (arr) => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (arr[i].fullTimeInExecution < arr[j].fullTimeInExecution) {
                    let aux = arr[i];
                    arr[i] = arr[j];
                    arr[j] = aux;
                }
            }
        }

        return arr;
    }

    // Form
    const [from_value, setFrom_value] = useState(10);
    const [to_value, setTo_value] = useState(20);
    const [cpu_weigth, setCpu_weigth] = useState(0.7);
    const [memory_weigth, setMemory_weigth] = useState(0.6);
    const [io_weight, setIo_weight] = useState(0.5);
    const [dataset, setDataset] = useState(0);

    // Data from backend
    const [FIFOData, setFIFOData] = useState();
    const [FairShareData, setFairShareData] = useState();
    const [lotteryData, setLotteryData] = useState();
    const [priorityQueuesData, setPriorityQueuesData] = useState();
    const [shortestJobFirstData, setShortestJobFirstData] = useState();

    // Local data
    const [finalArr, setFinalArr] = useState([]);

    const [ShowTable, setShowTable] = useState(false);
    const [SelectProcesses, setSelectProcesses] = useState(-1);


    const handleComparison = async (e) => {
        e.preventDefault();
        setShowTable(true);

        try {
            const responseFairShare = await Axios.get(`http://localhost:3001/api/fairShare/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`);
            const fairShareLastProcess = getLastProcess(responseFairShare.data);
            fairShareLastProcess.type = 'fairShare';
            setFairShareData(fairShareLastProcess);

            const responseFIFO = await Axios.get(`http://localhost:3001/api/firstInFirstOut/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`);
            const fifoLastProcess = getLastProcess(responseFIFO.data);
            fifoLastProcess.type = 'fifo';
            setFIFOData(fifoLastProcess);

            const responsePriorityQueues = await Axios.get(`http://localhost:3001/api/priorityQueues/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`);
            const pqLastProcess = getLastProcess(responsePriorityQueues.data);
            pqLastProcess.type = 'priorityQueues';
            setPriorityQueuesData(pqLastProcess);

            const responseShortestJobFirst = await Axios.get(`http://localhost:3001/api/shortestJobFirst/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`);
            const sjfLastProcess = getLastProcess(responseShortestJobFirst.data);
            sjfLastProcess.type = 'shortestJobFirst';
            setShortestJobFirstData(sjfLastProcess);

            const lotteryResult = randomizeLottery(
                fifoLastProcess.fullTimeInExecution,
                fairShareLastProcess.fullTimeInExecution,
                pqLastProcess.fullTimeInExecution,
                sjfLastProcess.fullTimeInExecution
            );

            setLotteryData(lotteryResult);

            const arr = [fifoLastProcess, fairShareLastProcess, pqLastProcess, sjfLastProcess, lotteryResult];
            setFinalArr(orderArrayOfTimes(arr));
        } catch (error) {
            console.error('Erro durante a comparação:', error);
        }
    };

    const formatAlgorithmName = (name) => {
        // Transforma "shortestJobFirst" em "Shortest Job First"
        return name
            .replace(/([A-Z])/g, ' $1') // Adiciona espaços antes de cada letra maiúscula
            .replace(/^./, (str) => str.toUpperCase()); // Converte a primeira letra para maiúscula
    };

    const handleClear = () => {
        setSelectProcesses(-1);
        setShowTable(false);
    };


    return (

        <div className="compare-page">
            <div className="compare-first-in-first">Comparação de algoritmos de escalonamento</div>
            <Link to="/">
                <div className="compare-page-child" />
                <img className="compare-vector-icon" alt="" src={homeIcon} />
            </Link>

            <form className="schedule_form_FIFO" onSubmit={handleComparison}>
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
                <Link>
                    <div className="frame-parentcompare">
                        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                        </svg>
                        <div className="compare-comparar" onClick={handleComparison}> Comparar</div>
                    </div>
                </Link>
                <Link>
                    <div className="frame-parentclear">
                        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                        </svg>
                        <div className="clear-button" onClick={handleClear}> Limpar</div>
                    </div>
                </Link>
            </form>

            {ShowTable && (
                <table>
                    <thead>

                        <tr>
                            <th> Colocação </th>
                            <th> Tempo (ut) </th>
                            <th> Algoritmo de Escalonamento </th>
                        </tr>

                    </thead>
                    <tbody>
                    {finalArr.map((item, index) => (
                        <tr key={index}>
                        <td> {index + 1}º</td>
                        <td>{item.fullTimeInExecution}</td>
                            <td>{formatAlgorithmName(item.type)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default CompareSchedulers;