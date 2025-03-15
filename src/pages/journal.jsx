import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Journal() {
    const [entry, setEntry] = useState("");
    const [savedEntries, setSavedEntries] = useState([]);
    const [date, setDate] = useState(new Date());

    // 📌 1. バックエンドから Journal エントリーを取得
    useEffect(() => {
        fetch("/api/journal")
            .then((res) => res.json())
            .then((data) => setSavedEntries(data))
            .catch((err) => console.error("Failed to fetch journal entries:", err));
    }, []);

    // 📌 2. Journal エントリーを保存
    const handleSaveEntry = () => {
        if (!entry.trim()) return;

        fetch("/api/journal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entry: `${date.toLocaleDateString()} ${entry}` }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSavedEntries(data.entries);
                setEntry("");
            })
            .catch((err) => console.error("Failed to save entry:", err));
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Container className="flex-grow-1 w-100">
                <div className="bg-light p-4 rounded shadow text-center">
                    
                    {/* 📌 カレンダーを中央揃え */}
                    <h2 className="text-success text-center">Calendar</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <div style={{ width: "fit-content", padding: "10px", margin: "auto" }}>
                            <Calendar onChange={setDate} value={date} />
                        </div>
                    </div>
                    <p className="text-center">Selected Date: {date.toDateString()}</p>

                    <h2 className="text-success text-center mt-4">Write your Daily Journal</h2>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write your day here..."
                                value={entry}
                                onChange={(e) => setEntry(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" className="w-100" onClick={handleSaveEntry}>
                            Save Entry
                        </Button>
                    </Form>

                    <h2 className="text-success text-center mt-4">Saved Journal Entries</h2>
                    
                    {/* 📌 スクロール可能なエリアを追加 */}
                    <div className="overflow-auto" style={{ maxHeight: "300px", border: "1px solid #ddd", padding: "10px" }}>
                        <ul className="list-group">
                            {savedEntries.length > 0 ? (
                                savedEntries.map((e, index) => (
                                    <li key={index} className="list-group-item">{e}</li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">No journal entries yet.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </Container>

            {/* 📌 フッターを固定 */}
            <footer className="py-3 text-center shadow-sm mt-auto" style={{ backgroundColor: "#E8F5E9", position: "fixed", bottom: "0", width: "100%" }}>
                <div className="container">
                    <span style={{ color: "#388E3C" }}>&copy; 2025 Life Hack Journal</span>
                    <a className="ms-3 fw-bold" href="https://github.com/rikushiraiwa/startup" style={{ color: "#388E3C" }}>
                        GitHub Repository
                    </a>
                </div>
            </footer>
        </div>
    );
}
