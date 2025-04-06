import React, { useState, useEffect } from "react";

export default function Goal() {
    const [goal, setGoal] = useState("");
    const [savedGoals, setSavedGoals] = useState([]);

    // ✅ 環境に応じた API ベースURL
    const apiBase = import.meta.env.PROD
        ? "https://startup.lifehackjournal.click"
        : "";

    // ✅ セッションチェック＋ゴール取得
    useEffect(() => {
        // セッション確認
        fetch(`${apiBase}/api/session`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.isLoggedIn) {
                    window.location.href = "/login";
                } else {
                    // ログイン済 → ゴール取得
                    fetch(`${apiBase}/api/goals`, {
                        credentials: "include",
                    })
                        .then((res) => res.json())
                        .then((data) => setSavedGoals(data))
                        .catch((err) => console.error("Failed to fetch goals:", err));
                }
            })
            .catch((err) => {
                console.error("Session check failed:", err);
                window.location.href = "/login";
            });
    }, []);

    const handleSaveGoal = () => {
        if (!goal.trim()) return;

        fetch(`${apiBase}/api/goals`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ goal }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSavedGoals(data.goals);
                setGoal("");
            })
            .catch((err) => console.error("Failed to save goal:", err));
    };

    return (
        <div className="container py-5">
            <main className="bg-white p-4 rounded shadow-sm">
                <h2 className="text-center text-success">Managing Your Goals</h2>
                <p className="text-center text-muted">Set, track, and achieve your goals effectively.</p>

                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Write your goals here..."
                        rows="5"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    ></textarea>
                </div>

                <div className="text-center">
                    <button className="btn btn-success px-4" onClick={handleSaveGoal}>
                        Save Goal
                    </button>
                </div>

                <hr />

                <h2 className="text-center text-success">Database</h2>
                <p className="text-center text-muted">Stored goals will be displayed here.</p>

                <ul className="list-group">
                    {savedGoals.length > 0 ? (
                        savedGoals.map((g, index) => (
                            <li key={g._id || index} className="list-group-item">
                                {g.goal || g}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No goals saved yet.</li>
                    )}
                </ul>
            </main>
        </div>
    );
}
