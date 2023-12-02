// import "./FIFO.css";
// import homeIcon from "./vector.svg";

//Hooks
import { useState, useEffect } from "react";
import { Await, Link } from "react-router-dom";

//Components
import BlockProcess from "../../components/BlockProcess/BlockProcess";

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

    const handleComparison = async (e) => {
        e.preventDefault();

        await Axios.get(`http://localhost:3001/api/fairShare/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`)
        .then(async (responseFairShare) =>  {
            let lastProcess = getLastProcess(responseFairShare.data)
            lastProcess.type = 'fairShare'
            setFairShareData(lastProcess);
            
            await Axios.get(`http://localhost:3001/api/firstInFirstOut/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`)
            .then(async (responseFIFO) => {
                lastProcess = getLastProcess(responseFIFO.data)
                lastProcess.type = 'fifo'
                setFIFOData(lastProcess)

                await Axios.get(`http://localhost:3001/api/priorityQueues/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`)
                .then(async (responsePriorityQueues) => {
                    lastProcess = getLastProcess(responsePriorityQueues.data)
                    lastProcess.type = 'priorityQueues'
                    setPriorityQueuesData(lastProcess)
                
                    await Axios.get(`http://localhost:3001/api/shortestJobFirst/${from_value}/${to_value}/${cpu_weigth}/${memory_weigth}/${io_weight}/${dataset}`)
                    .then(async (responseShortestJobFirst) => {
                        lastProcess = getLastProcess(responseShortestJobFirst.data);
                        lastProcess.type = 'shortestJobFirst'
                        setShortestJobFirstData(lastProcess)
                    })
                    .then(async () => {
                        setLotteryData(randomizeLottery(FIFOData.fullTimeInExecution, FairShareData.fullTimeInExecution, priorityQueuesData.fullTimeInExecution, shortestJobFirstData.fullTimeInExecution))
                    })
                    .then(() => {
                        const arr = [FIFOData, FairShareData, priorityQueuesData, shortestJobFirstData, lotteryData];
                        setFinalArr(orderArrayOfTimes(arr))
                    })
                })
            })
        })
    }

    return (
        <div>
            <button onClick={handleComparison}> Comparar algoritmos de escalonamento </button>

            <table>
                <thead>
                <tr>
                    <th> Colocação </th>
                    <th> Tempo </th>
                    <th> Algoritmo de Escalonamento </th>
                </tr>
                </thead>
                <tbody>
                {finalArr.map((item, index) => (
                    <tr key={index}>
                    <td> {index + 1} </td>
                    <td>{item.fullTimeInExecution}</td>
                    <td>{item.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {FIFOData && (
                <div>
                    <h2>First In First Out:</h2>
                    {FIFOData.fullTimeInExecution}
                </div>
            )}

            {FairShareData && (
                <div>
                    <h2>Fair Share:</h2>
                    {FairShareData.fullTimeInExecution}
                </div>
            )}

            {lotteryData && (
                <div>
                    <h2>Lottery:</h2>
                    {lotteryData.fullTimeInExecution}
                </div>
            )}

            {priorityQueuesData && (
                <div>
                    <h2>Priority Queues:</h2>
                    {priorityQueuesData.fullTimeInExecution}
                </div>
            )}

            {shortestJobFirstData && (
                <div>
                    <h2>Shortest Job First:</h2>
                    {shortestJobFirstData.fullTimeInExecution}
                </div>
            )}
        </div>
    );
}

export default CompareSchedulers;