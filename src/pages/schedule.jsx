import React from "react";

export default function Schedule() {
    return (
        <div className="container-fluid bg-light-green min-vh-100 d-flex flex-column align-items-center py-5">
            {/* ヘッダー */}
            <header className="text-center mb-4">
            </header>

            {/* メインコンテンツ */}
            <main className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "600px", width: "90%" }}>
                <h2 className="text-success fw-bold">Plan Your Day</h2>
                {/* タスク管理 */}
                <ul className="list-group text-start">
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task1
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task2
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="me-2" /> Task3
                    </li>
                </ul>
                <div className="input-group my-3">
                    <input type="text" className="form-control" placeholder="New Task" />
                    <button className="btn btn-success text-white">Add Task</button>
                </div>

                {/* スケジュール管理 */}
                <h2 className="text-success fw-bold">Schedule Your Day</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Event:</label>
                    <input type="text" className="form-control" placeholder="Event Name" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Time:</label>
                    <input type="time" className="form-control" />
                </div>
                <button className="btn btn-success text-white w-100">Add to Schedule</button>

                {/* 今日のスケジュール */}
                <h3 className="text-success fw-bold mt-4">Today's Schedule</h3>
                <ul className="list-group text-start">
                    <li className="list-group-item">9:00am - Meeting</li>
                    <li className="list-group-item">11:00am - Meeting</li>
                </ul>

                <h2 className="text-green fw-bold mt-4">Database</h2>
            </main>
        </div>
    );
}
