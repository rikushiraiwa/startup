import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../public/placeholder.png";
import "./styles/home.css";


export default function Home() {
    return (
        <div>
            <header>
                <h1>Life Hack Journal</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/journal">Journal</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/goal">Goals</Link></li>
                    </ul>
                </nav>
                <img src={placeholderImage} alt="Placeholder" />
            </header>

            <main>
                <h2>Welcome to Life Hack Journal</h2>
                <p>This is the journal to achieve your life goal</p>
                <p>Setting Goals, make ToDos, set schedules, reflect by writing journal</p>

                <h2>Websocket Data here</h2>
            </main>

            <a href="https://github.com/rikushiraiwa/startup.git">GitHub</a>

            <footer>
                <p>&copy; 2025 Life Hack Journal</p>
            </footer>
        </div>
    );
}
