import express from "express";
import cors from "cors";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let journalEntries = [];
let goals = [];
let tasks = [];
let schedule = [];

// 📌 Journal APIs
app.get("/api/journal", (req, res) => {
    res.json(journalEntries);
});

app.post("/api/journal", (req, res) => {
    const { entry } = req.body;
    if (!entry || entry.trim() === "") {
        return res.status(400).json({ error: "Entry cannot be empty" });
    }
    journalEntries.push(entry);
    res.json({ message: "Journal entry saved!", entries: journalEntries });
});

// 📌 Goals APIs
app.get("/api/goals", (req, res) => {
    res.json(goals);
});

app.post("/api/goals", (req, res) => {
    const { goal } = req.body;
    if (!goal || goal.trim() === "") {
        return res.status(400).json({ error: "Goal cannot be empty" });
    }
    goals.push(goal);
    res.json({ message: "Goal saved!", goals });
});

// 📌 Tasks APIs
app.get("/api/tasks", (req, res) => res.json(tasks));

app.post("/api/tasks", (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Task cannot be empty" });
    }
    tasks.push({ text, completed: false });
    res.json(tasks);
});

app.delete("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json(tasks);
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

app.patch("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed;
        res.json(tasks);
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

// 📌 Schedule APIs
app.get("/api/schedule", (req, res) => res.json(schedule));

app.post("/api/schedule", (req, res) => {
    const { name, time } = req.body;
    if (!name.trim() || !time.trim()) {
        return res.status(400).json({ error: "Event name and time are required" });
    }
    schedule.push({ name, time });
    res.json(schedule);
});

app.delete("/api/schedule/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < schedule.length) {
        schedule.splice(index, 1);
        res.json(schedule);
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

// 📌 サーバー起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
