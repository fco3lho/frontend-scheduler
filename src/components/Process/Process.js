import React from 'react';
import { motion } from 'framer-motion';
import './Process.css';

const Process = ({ id, isActive }) => {
  return (
    <motion.div
      className={`process ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: isActive ? 30 : 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      {id}
    </motion.div>
  );
};

export default Process;
