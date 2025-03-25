import React, { useState, useEffect } from "react";

export default function Schedule() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventTime, setEventTime] = useState("");

    useEffect(() => {
        fetch("/api/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Failed to load tasks:", err));

        fetch("/api/schedule")
            .then((res) => res.json())
            .then((data) => setSchedule(data))
            .catch((err) => console.error("Failed to load schedule:", err));
    }, []);

    const handleAddTask = () => {
        if (!newTask.trim()) return;

        fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newTask }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setNewTask("");
            })
            .catch((err) => console.error("Failed to add task:", err));
    };

    const handleDeleteTask = (id) => {
        fetch(`/api/tasks/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Failed to delete task:", err));
    };

    const handleAddSchedule = () => {
        if (!eventName.trim() || !eventTime.trim()) return;

        fetch("/api/schedule", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: eventName, time: eventTime }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSchedule(data);
                setEventName("");
                setEventTime("");
            })
            .catch((err) => console.error("Failed to add schedule:", err));
    };

    const handleDeleteSchedule = (id) => {
        fetch(`/api/schedule/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete schedule");
                return res.json();
            })
            .then((data) => setSchedule(data))
            .catch((err) => console.error("Failed to delete schedule:", err));
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
                        tasks.map((task) => (
                            <li key={task._id} className="list-group-item d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="me-2"
                                    onChange={() => handleDeleteTask(task._id)}
                                />
                                <span>{task.text}</span>
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
                        schedule.map((event) => (
                            <li key={event._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {event.time} - {event.name}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteSchedule(event._id)}  // ← 修正ここ！
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
