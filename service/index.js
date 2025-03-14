import express from "express";
import cors from "cors";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let journalEntries = [];
let goals = [];


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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
