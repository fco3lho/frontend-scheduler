import React from 'react'
import {Link} from "react-router-dom";
import homeIcon from "../FIFO/vector.svg";

const ShortestJobFirst = () => {
  return (
      <div className="schedule-page">
        <div className="text" />
        <div className="schedule-first-in-first">Shorted Job First</div>
        <Link to="/">
          <div className="schedule-page-child" />
          <img className="schedule-vector-icon" alt="" src={homeIcon} />
        </Link>
        <Link>
          <div className="frame-parentschedule">
            <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
            </svg>
            <div className="schedule-escalonar">Escalonar</div>
          </div>
        </Link>
      </div>
  )
}

export default ShortestJobFirst