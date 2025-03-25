import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Journal from "./pages/journal";
import Goal from "./pages/goal";
import Login from "./pages/login";
import Register from "./pages/Register";

function NotFound() {
    return (
        <main className="container-fluid text-center py-5" style={{ backgroundColor: "#E8F5E9", color: "#388E3C" }}>
            <h1>404: Page Not Found</h1>
        </main>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#E8F5E9" }}>
                
                {/* ナビゲーションバーを固定＆デザイン改善 */}
                <header className="container-fluid sticky-top shadow">
                    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#388E3C", padding: "15px 0" }}>
                        <div className="container">
                            <NavLink className="navbar-brand fw-bold fs-4" to="/" style={{ color: "#FFFFFF" }}>
                                Life Hack Journal
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link px-3 fs-5" to="/home" style={{ color: "#FFFFFF" }}>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link px-3 fs-5" to="/journal" style={{ color: "#FFFFFF" }}>
                                            Journal
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link px-3 fs-5" to="/schedule" style={{ color: "#FFFFFF" }}>
                                            Schedule
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link px-3 fs-5" to="/goal" style={{ color: "#FFFFFF" }}>
                                            Goals
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link px-3 fs-5" to="/login" style={{ color: "#FFFFFF" }}>
                                            Login
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="container flex-grow-1 mt-4">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/journal" element={<Journal />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/goal" element={<Goal />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <footer className="py-3 text-center shadow-sm mt-auto" style={{ backgroundColor: "#E8F5E9" }}>
                    <div className="container">
                        <span style={{ color: "#388E3C" }}>&copy; 2025 Life Hack Journal</span>
                        <a className="ms-3 fw-bold" href="https://github.com/rikushiraiwa/startup" style={{ color: "#388E3C" }}>
                            GitHub Repository
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}
