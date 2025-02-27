import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const placeholderImage = "/placeholder.png";

export default function Home() {
    const [websocketData, setWebsocketData] = useState("Waiting for data...");

    useEffect(() => {
        const messages = [
            "New journal entry available!",
            "Goal completed: Read 5 pages today",
            "Upcoming event: Meeting at 3 PM",
            "New task added: Buy groceries",
            "Reminder: Reflect on today's progress"
        ];

        const interval = setInterval(() => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            setWebsocketData(randomMessage);
        }, 5000); // Simulate WebSocket messages every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className="container-fluid vh-100 d-flex flex-column align-items-center py-4" style={{ backgroundColor: "#E8F5E9" }}>
            <header className="text-center mb-4">
                <h1 className="text-success fw-bold">Life Hack Journal</h1>
            </header>

            <Container className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "700px", width: "90%" }}>
                <h2 className="text-success fw-bold">Welcome to Life Hack Journal</h2>
                <div className="text-center my-3">
                    <img src={placeholderImage} alt="Placeholder" className="rounded-circle" width="120" />
                </div>
                <p className="text-muted">This is the journal to achieve your life goal</p>
                <p className="text-muted">Setting Goals, make ToDos, set schedules, reflect by writing journal</p>

                <h2 className="text-success fw-bold mt-4">Websocket Data here</h2>
                <div className="bg-light p-3 rounded shadow-sm mt-3">
                    <p className="text-muted">{websocketData}</p>
                </div>
            </Container>
        </div>
    );
}
