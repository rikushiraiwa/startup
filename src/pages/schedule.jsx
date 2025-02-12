import React from "react";
import { Link } from "react-router-dom";
import "../styles/schedule.css";

export default function Schedule() {
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
                <h2>Plan Your Day</h2>
                <ul>
                    <li><input type="checkbox" /> Task1</li>
                    <li><input type="checkbox" /> Task2</li>
                    <li><input type="checkbox" /> Task3</li>
                </ul>
                <input type="text" placeholder="New Task" />
                <button>Add Task</button>

                <h2>Schedule Your Day</h2>
                <label>Event:</label>
                <input type="text" placeholder="Event Name" />
                <label>Time:</label>
                <input type="time" />
                <button>Add to Schedule</button>
                <h3>Today's Schedule</h3>
                <ul>
                    <li>9:00am - Meeting</li>
                    <li>11:00am - Meeting</li>
                </ul>

                <h2>Database</h2>
            </main>

            <footer>
                <p>&copy; 2025 Life Hack Journal</p>
            </footer>
        </div>
    );
}
