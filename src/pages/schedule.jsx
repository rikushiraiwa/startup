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
                <h1 className="text-success fw-bold">Daily Schedule</h1>
            </header>

            <main className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "600px", width: "90%" }}>
                <h2 className="text-success fw-bold">Plan Your Day</h2>
                <ul className="list-group text-start">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index} className="list-group-item d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(index)}
                                />
                                <span className={task.completed ? "text-decoration-line-through" : ""}>{task.text}</span>
                                <button
                                    className="btn btn-danger btn-sm ms-auto"
                                    onClick={() => handleDeleteTask(index)}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No tasks yet.</li>
                    )}
                </ul>
                <div className="input-group my-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className="btn btn-success text-white" onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>

                <h2 className="text-success fw-bold">Schedule Your Day</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Event:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Time:</label>
                    <input
                        type="time"
                        className="form-control"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                    />
                </div>
                <button className="btn btn-success text-white w-100" onClick={handleAddSchedule}>
                    Add to Schedule
                </button>

                <h3 className="text-success fw-bold mt-4">Today's Schedule</h3>
                <ul className="list-group text-start">
                    {schedule.length > 0 ? (
                        schedule.map((event, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {event.time} - {event.name}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteSchedule(index)}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No events scheduled.</li>
                    )}
                </ul>
            </main>
        </div>
    );
}
