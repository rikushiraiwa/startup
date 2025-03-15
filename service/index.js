import express from "express";
import cors from "cors";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let journalEntries = [];
let goals = [];
let schedule = [];



//Journal APIs
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


//Goals APIs
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

//Schedule APIs
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

//Add task
app.post("/api/tasks", (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Task cannot be empty" });
    }
    tasks.push({ text, completed: false });
    res.json({ message: "Task added!", tasks });
});

//Delete task
app.delete("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: "Task deleted!", tasks });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

//Chnage task's status
app.patch("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed;
        res.json({ message: "Task updated!", tasks });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

//Get schedule
app.get("/api/schedule", (req, res) => {
    res.json(schedule);
});

//Add shcedule
app.post("/api/schedule", (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ error: "Event name and time are required" });
    }
    schedule.push({ name, time });
    res.json({ message: "Schedule added!", schedule });
});

//Delete schedule
app.delete("/api/schedule/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < schedule.length) {
        schedule.splice(index, 1);
        res.json({ message: "Schedule deleted!", schedule });
    } else {
        res.status(400).json({ error: "Invalid index" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
