import React from "react";

//Hooks
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//CSS
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import FIFO from "./pages/FIFO/FIFO";
import FairShare from "./pages/FairShare/FairShare";
import Lottery from "./pages/Lottery/Lottery";
import PriorityQueues from "./pages/PriorityQueues/PriorityQueues";
import ShortestJobFirst from "./pages/ShortestJobFirst/ShortestJobFirst";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fifo" element={<FIFO />} />
          <Route path="/fairShare" element={<FairShare />} />
          <Route path="/lottery" element={<Lottery />} />
          <Route path="/priorityQueues" element={<PriorityQueues />} />
          <Route path="/shortestJobFirst" element={<ShortestJobFirst />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
