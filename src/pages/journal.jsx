import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";

export default function Journal() {
    const [entry, setEntry] = useState("");
    const [savedEntries, setSavedEntries] = useState([]);

    // 📌 1. バックエンドからJournalエントリーを取得
    useEffect(() => {
        fetch("/api/journal")
            .then((res) => res.json())
            .then((data) => setSavedEntries(data))
            .catch((err) => console.error("Failed to fetch journal entries:", err));
    }, []);

    // 📌 2. Journalエントリーを保存
    const handleSaveEntry = () => {
        if (!entry.trim()) return;

        fetch("/api/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ entry }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSavedEntries(data.entries);
                setEntry("");
            })
            .catch((err) => console.error("Failed to save entry:", err));
    };

    return (
        <div className="vh-100 d-flex flex-column">
            <Container className="flex-grow-1 w-100">
                <div className="bg-light p-4 rounded shadow">
                    <h2 className="text-success text-center">Calendar</h2>
                    <Table bordered hover className="text-center">
                        <thead className="table-success">
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td>
                            </tr>
                            <tr>
                                <td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h2 className="text-success text-center mt-4">Google Calendar API</h2>

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
            </Container>
        </div>
    );
}
