import React, { useState } from "react";
import "./FifoScheduler.css";
import { motion } from "framer-motion";

const FifoScheduler = () => {
  const [processes, setProcesses] = useState([1, 2, 3, 4, 5]);

  const handleSchedule = () => {
    setProcesses((prevProcesses) => {
      const [scheduledProcess, ...remainingProcesses] = prevProcesses;
      return [...remainingProcesses, scheduledProcess];
    });
  };

  const moverElemento = (index) => {
    if (index === 0) {
      return {
        x: 0,
        y: 10,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      };
    }

    return {
      x: `${index * 10}%`,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    };
  };

  return (
    <div className="fifo-scheduler">
      <button onClick={handleSchedule}>Escalonar</button>
      <div className="process-container">
        {processes.map((process, index) => (
          <motion.div
            key={index}
            className="process"
            initial={{ opacity: 1, x: 0 }}
            animate={moverElemento(index)}
          >
            Processo {process}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FifoScheduler;
