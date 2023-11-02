import React from 'react';
import './App.css';
import FifoSimulator from './components/FifoSimulator/FifoSimulator';

const App = () => {
  return (
    <div className="App">
      <h1>Simulação FIFO</h1>
      <FifoSimulator />
    </div>
  );
};

export default App;
