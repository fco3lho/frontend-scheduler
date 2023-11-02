import React, { useState } from "react";
import Process from "../Process/Process";
import { AnimatePresence } from "framer-motion";
import "./FifoSimulator.css";

const FifoSimulator = () => {
  const [processes, setProcesses] = useState([1, 2, 3, 4]);

  const handleSchedule = () => {
    setProcesses((prevProcesses) => {
      const [scheduledProcess, ...remainingProcesses] = prevProcesses;
      return [...remainingProcesses, scheduledProcess];
    });
  };

  const activeProcess = processes[0];

  return (
    <>
      <button onClick={handleSchedule}>Escalonar</button>
      <div className="fifo-simulator">
        <div className="process-container">
          <AnimatePresence>
            {processes.map((id, index) => (
              <Process
                key={id}
                id={id}
                isActive={id === activeProcess}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default FifoSimulator;
