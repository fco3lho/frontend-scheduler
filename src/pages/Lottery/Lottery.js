import React, {useState} from 'react';
import {Link} from "react-router-dom";
import homeIcon from "../FIFO/vector.svg";
import './Lottery.css'



const Lottery = () => {

        //Form
        const [from_value, setFrom_value] = useState(10);
        const [to_value, setTo_value] = useState(20);
        const [cpu_weigth, setCpu_weigth] = useState(0.5);
        const [memory_weigth, setMemory_weigth] = useState(0.3);
        const [io_weight, setIo_weight] = useState(0.2);
      
  return (
      <div className="schedule-page">
          <div className="text" />
          <div className="schedule-first-in-first">Loteria</div>
          <Link to="/">
              <div className="schedule-page-child" />
              <img className="schedule-vector-icon" alt="" src={homeIcon} />
          </Link>
        <form className="schedule_form-lot">
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
        <div className='botoes-lot'>
            <button>Randômica</button>
            <button type="submit" class="button-secondary">Prioritária</button>
            <button type="submit" class="button-tertiary">Igualitária</button>
        </div>
      </form>
      </div>
  )
}

export default Lottery