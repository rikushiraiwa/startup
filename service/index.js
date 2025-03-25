import { MongoClient } from "mongodb";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("dbConfig.json"));
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");

const journalCollection = db.collection("journal");
const goalCollection = db.collection("goals");
const taskCollection = db.collection("tasks");
const scheduleCollection = db.collection("schedule");
const userCollection = db.collection("users");



import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.static("public"));

// 📌 セッションの設定
app.use(session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // HTTPSで運用する場合は true にする
}));

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log("Connected to MongoDB Atlas successfully.");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
})();


// 📌 Journal APIs
app.get("/api/journal", (req, res) => {
    try {
        res.json(journalEntries.length ? journalEntries : []);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/journal", (req, res) => {
    try {
        const { entry } = req.body;
        if (!entry || entry.trim() === "") {
            return res.status(400).json({ error: "Entry cannot be empty" });
        }
        journalEntries.push(entry);
        res.json({ message: "Journal entry saved!", entries: journalEntries });
    } catch (error) {
        console.error("Error saving journal entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Goals APIs
app.get("/api/goals", (req, res) => res.json(goals));

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


//user register
app.post("/api/register", (req, res) => {
    const { userName, password } = req.body;
    if (!userName.trim() || !password.trim()) {
        return res.status(400).json({ error: "Username and password required" });
    }
    if (users[userName]) {
        return res.status(400).json({ error: "User already exists" });
    }
    users[userName] = { password };
    res.json({ message: "User registered successfully" });
});

// Login
app.post("/api/login", (req, res) => {
    const { userName, password } = req.body;
    if (!users[userName] || users[userName].password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    req.session.user = userName;
    res.json({ message: "Login successful", userName });
});

// Logout
app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logout successful" });
});

// Check session
app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true, userName: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// 📌 サーバー起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
