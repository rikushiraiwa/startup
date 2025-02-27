import React, { useState, useEffect } from "react";


export default function Schedule() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventTime, setEventTime] = useState("");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const storedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];
        setTasks(storedTasks);
        setSchedule(storedSchedule);
    }, []);

    const handleAddTask = () => {
        if (!newTask.trim()) return;

        const updatedTasks = [...tasks, { text: newTask, completed: false }];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setNewTask("");
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleAddSchedule = () => {
        if (!eventName.trim() || !eventTime.trim()) return;

        const updatedSchedule = [...schedule, { name: eventName, time: eventTime }];
        setSchedule(updatedSchedule);
        localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
        setEventName("");
        setEventTime("");
    };

    const handleDeleteSchedule = (index) => {
        const updatedSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(updatedSchedule);
        localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
    };

    return (
        <div className="container-fluid bg-light-green min-vh-100 d-flex flex-column align-items-center py-5">
            <header className="text-center mb-4">
            </header>

            <main className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "600px", width: "90%" }}>
                <h2 className="text-success fw-bold">Plan Your Day</h2>
                <ul className="list-group text-start">
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task1
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task2
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task3
                    </li>
                </ul>
                <div className="input-group my-3">
                    <input type="text" className="form-control" placeholder="New Task" />
                    <button className="btn btn-success text-white">Add Task</button>
                </div>

                <h2 className="text-success fw-bold">Schedule Your Day</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Event:</label>
                    <input type="text" className="form-control" placeholder="Event Name" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Time:</label>
                    <input type="time" className="form-control" />
                </div>
                <button className="btn btn-success text-white w-100">Add to Schedule</button>

                <h3 className="text-success fw-bold mt-4">Today's Schedule</h3>
                <ul className="list-group text-start">
                    <li className="list-group-item">9:00am - Meeting</li>
                    <li className="list-group-item">11:00am - Meeting</li>
                </ul>

                <h2 className="text-green fw-bold mt-4">Database</h2>
            </main>
        </div>
    );
}
