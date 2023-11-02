import React from 'react';
import './App.css';
import FifoScheduler from './components/FifoScheduler/FifoScheduler';

const App = () => {
  return (
    <div className="app">
      <h1>Simulação FIFO Scheduler</h1>
      <FifoScheduler />
    </div>
  );
};

export default App;