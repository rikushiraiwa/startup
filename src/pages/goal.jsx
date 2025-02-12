import React from "react";

export default function Goal() {
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
                    ></textarea>
                </div>

                <div className="text-center">
                    <button className="btn btn-success px-4">Save Goals</button>
                </div>

                <hr />

                <h2 className="text-center text-success">Database</h2>
                <p className="text-center text-muted">Stored goals will be displayed here.</p>
            </main>
        </div>
    );
}
