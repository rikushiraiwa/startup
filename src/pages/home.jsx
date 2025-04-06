import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const placeholderImage = "/placeholder.png";

export default function Home() {
    const [websocketData, setWebsocketData] = useState("Waiting for WebSocket connection...");

    // ✅ 環境に応じた API ベースURL
    const apiBase = import.meta.env.PROD
        ? "https://startup.lifehackjournal.click"
        : "";

    // ✅ ログイン状態をチェック
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

    // ✅ WebSocket 接続と受信処理
    useEffect(() => {
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";
        const socket = new WebSocket(`${protocol}://${window.location.host}`);

        socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send("Hello from client!");
        };

        socket.onmessage = (event) => {
            setWebsocketData(event.data);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => socket.close(); // クリーンアップ
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

                <h2 className="text-success fw-bold mt-4">WebSocket Messages</h2>
                <div className="bg-light p-3 rounded shadow-sm mt-3">
                    <p className="text-muted">{websocketData}</p>
                </div>
            </Container>
        </div>
    );
}
