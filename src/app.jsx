import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Journal from "./pages/journal";
import Goal from "./pages/goal";
import Login from "./pages/login";

// 404 Not Found ページ
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
            <div className="body" style={{ backgroundColor: "#E8F5E9", minHeight: "100vh" }}>
                {/* ナビゲーションバー */}
                <header className="container-fluid bg-white shadow-sm">
                    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#E8F5E9" }}>
                        <div className="container">
                            <NavLink className="navbar-brand fw-bold" to="/" style={{ color: "#388E3C" }}>
                                Life Hack Journal
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/" style={{ color: "#388E3C" }}>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/journal" style={{ color: "#388E3C" }}>Journal</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/schedule" style={{ color: "#388E3C" }}>Schedule</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/goal" style={{ color: "#388E3C" }}>Goals</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login" style={{ color: "#388E3C" }}>Login</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* ページ表示 */}
                <main className="container flex-grow-1 mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/journal" element={<Journal />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/goal" element={<Goal />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                {/* フッター */}
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
