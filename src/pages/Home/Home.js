import "./Home.css";

import { Link } from "react-router-dom";

import FifoImage from "./images/FIFO-Home.png"
import LoteryImage from "./images/Lotery.svg"
import SJF from "./images/SJF.svg"
import Priority from "./images/priority.svg"
import FairShare from "./images/fairshare.svg";


const Home = () => {
    return (
        <div className="home">
            <div className="frame-parent">
                <div className="first-in-first-out-wrapper">
                    <div className="first-in-first">First In First Out</div>
                </div>
                <img className="image-1-icon" alt="" src={FifoImage} />
                <Link to="/fifo" className="simular">
                    <div className="frame-group">
                        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                        </svg>
                        Simular
                    </div>
                </Link>
            </div>
            <div className="frame-container">
                <div className="first-in-first-out-wrapper">
                    <div className="first-in-first">Loteria</div>
                </div>
                <img className="tickets-1-icon" alt="" src={LoteryImage}/>

                    <Link to="/lottery" className="simular">
                        <div className="frame-group">
                            <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                            </svg>
                            Simular
                        </div>
                    </Link>

            </div>
            <div className="frame-parent3">
                <div className="first-in-first-out-wrapper">
                    <div className="first-in-first">Shortest Job First</div>
                </div>
                <img className="image-2-icon" alt="" src={SJF} />

                    <Link to="/shortestJobFirst" className="simular">
                        <div className="frame-group-sjf">
                            <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                            </svg>
                            Simular
                        </div>
                    </Link>

            </div>
            <div className="frame-parent5">
                <div className="first-in-first-out-wrapper">
                    <div className="first-in-first">Fila de prioridade</div>
                </div>
                <img className="priority-1-icon" alt="" src={Priority} />
                <Link to="/priorityQueues" className="simular">
                    <div className="frame-group">
                        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                        </svg>
                        Simular
                    </div>
                </Link>
            </div>
            <div className="frame-parent9">
                <div className="first-in-first-out-wrapper">
                    <div className="first-in-first">Fair Share</div>
                </div>
                <img className="fair-share-1-icon" alt="" src={FairShare} />
                <Link to="/FairShare" className="simular">
                    <div className="frame-group">
                        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.13477 0.385966C3.29648 -0.11169 2.24297 -0.128096 1.3877 0.336748C0.532422 0.801591 0 1.67659 0 2.62815V21.8782C0 22.8297 0.532422 23.7047 1.3877 24.1696C2.24297 24.6344 3.29648 24.6125 4.13477 24.1203L20.4473 14.4953C21.2572 14.0196 21.75 13.1719 21.75 12.2532C21.75 11.3344 21.2572 10.4922 20.4473 10.011L4.13477 0.385966Z" fill="white"/>
                        </svg>
                        Simular
                    </div>
                </Link>
            </div>
            <div className="home-child" />
            <div className="title">
                Escolha o escalonador que deseja simular
            </div>
            <div>
                <Link to="/compareAll" className="compare">

                    <div className="frame-group-compare">
                        <img width="40" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/compare.png" alt="compare"/>
                        Comparação entre escalonadores
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
