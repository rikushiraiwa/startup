import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const placeholderImage = "/placeholder.png";

export default function Home() {
    const [websocketData, setWebsocketData] = useState("Waiting for WebSocket connection...");

    const apiBase = import.meta.env.PROD
        ? "https://startup.lifehackjournal.click"
        : "";

    useEffect(() => {
        fetch(`${apiBase}/api/session`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (!data.isLoggedIn) {
                    window.location.href = "/login";
                }
            })
            .catch(err => {
                console.error("Session check failed:", err);
                window.location.href = "/login";
            });
    }, []);

    useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}`); // ← ✅ ポート指定不要


        console.log("🔌 Connecting WebSocket...");

        socket.onopen = () => {
            console.log("✅ WebSocket connected!");
            setWebsocketData("✅ Connected to WebSocket");
            socket.send("Hello from client!");
        };

        socket.onmessage = (event) => {
            console.log("📨 Message received:", event.data);
            setWebsocketData(event.data);
        };

        socket.onerror = (err) => {
            console.error("❌ WebSocket error:", err);
            setWebsocketData("❌ WebSocket error");
        };

        socket.onclose = () => {
            console.warn("🔌 WebSocket closed");
            setWebsocketData("🔌 WebSocket disconnected");
        };

        return () => socket.close();
    }, []);


    return (
        <div className="container-fluid vh-100 d-flex flex-column align-items-center py-4" style={{ backgroundColor: "#E8F5E9" }}>
            <header className="text-center mb-4">
                <h1 className="text-success fw-bold">Life Hack Journal</h1>
            </header>

            <Container className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "700px", width: "90%" }}>
                <h2 className="text-success fw-bold">Welcome to Life Hack Journal</h2>
                <p className="text-muted">This is the journal to achieve your life goal</p>
                <p className="text-muted">Setting Goals, make ToDos, set schedules, reflect by writing journal</p>

                <h2 className="text-success fw-bold mt-4">WebSocket Messages</h2>
                <div className="bg-light p-3 rounded shadow-sm mt-3">
                    <p className="text-muted">{websocketData}</p>
                </div>
            </Container>
        </div>
    );
}
