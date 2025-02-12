import React from "react";
import { Link } from "react-router-dom";
import "./styles/goal.css";


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
            </header>

            <main>
                <h2>Managing Your Goals</h2>
                <textarea placeholder="Write your goals here..." rows="5" cols="50"></textarea>
                <button>Save Goals</button>


                <h2>DataBase</h2>

            </main>

            <footer>
                <p>&copy; 2025 Life Hack Journal</p>
            </footer>
        </div>
    );
}
