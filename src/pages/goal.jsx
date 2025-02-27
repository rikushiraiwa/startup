import React, { useState, useEffect } from "react";

export default function Goal() {
    const [goal, setGoal] = useState("");
    const [savedGoals, setSavedGoals] = useState([]);

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
        setSavedGoals(storedGoals);
    }, []);

    const handleSaveGoal = () => {
        if (!goal.trim()) return;

        const updatedGoals = [...savedGoals, goal];
        setSavedGoals(updatedGoals);
        localStorage.setItem("goals", JSON.stringify(updatedGoals));
        setGoal("");
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
                        Save Goals
                    </button>
                </div>

                <hr />

                <h2 className="text-center text-success">Database</h2>
                <p className="text-center text-muted">Stored goals will be displayed here.</p>

                <ul className="list-group">
                    {savedGoals.length > 0 ? (
                        savedGoals.map((g, index) => (
                            <li key={index} className="list-group-item">{g}</li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No goals saved yet.</li>
                    )}
                </ul>
            </main>
        </div>
    );
}
