import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Journal from "./pages/journal";
import Goals from "./pages/goal";
import Login from "./pages/login";


// 404 Not Found ページ
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Page Not Found</main>;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                {/* ナビゲーションバー */}
                <header className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container">
                            <NavLink className="navbar-brand" to="/">Life Hack Journal</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/journal">Journal</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/schedule">Schedule</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/goals">Goals</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* ページ表示 */}
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/journal" element={<Journal />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/goals" element={<Goals />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                {/* フッター */}
                <footer className="bg-dark text-white-50 py-3 text-center">
                    <div className="container">
                        <span className="text-reset">© 2025 Life Hack Journal</span>
                        <a className="text-reset ms-3" href="https://github.com/rikushiraiwa/startup">
                            GitHub Repository
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}
