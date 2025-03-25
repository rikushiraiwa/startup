import express from "express";
import cors from "cors";
import session from "express-session";
import fs from "fs";
import { MongoClient } from "mongodb";

// DB Connection Setup
const config = JSON.parse(fs.readFileSync("dbConfig.json"));
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");

const journalCollection = db.collection("journal");
const goalCollection = db.collection("goals");
const taskCollection = db.collection("tasks");
const scheduleCollection = db.collection("schedule");
const userCollection = db.collection("users");

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
app.get("/api/journal", async (req, res) => {
    try {
        const entries = await journalCollection.find().toArray();
        res.json(entries);
    } catch {
        res.status(500).json({ error: "Failed to fetch journal entries" });
    }
});

app.post("/api/journal", async (req, res) => {
    const { entry } = req.body;
    if (!entry || entry.trim() === "") {
        return res.status(400).json({ error: "Entry cannot be empty" });
    }

    try {
        await journalCollection.insertOne({ entry });
        const entries = await journalCollection.find().toArray();
        res.json({ message: "Journal entry saved!", entries });
    } catch (err) {
        console.error("❌ Error inserting journal entry:", err); // ←ここを追加
        res.status(500).json({ error: "Failed to save journal entry" });
    }
});


// 📌 Goals APIs
app.get("/api/goals", async (req, res) => {
    try {
        const goals = await goalCollection.find().toArray();
        res.json(goals);
    } catch {
        res.status(500).json({ error: "Failed to fetch goals" });
    }
});

app.post("/api/goals", async (req, res) => {
    const { goal } = req.body;
    if (!goal || goal.trim() === "") {
        return res.status(400).json({ error: "Goal cannot be empty" });
    }
    try {
        await goalCollection.insertOne({ goal });
        const goals = await goalCollection.find().toArray();
        res.json({ message: "Goal saved!", goals });
    } catch {
        res.status(500).json({ error: "Failed to save goal" });
    }
});


// 📌 Tasks APIs
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await taskCollection.find().toArray();
        res.json(tasks);
    } catch {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

app.post("/api/tasks", async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Task cannot be empty" });
    }
    try {
        await taskCollection.insertOne({ text, completed: false });
        const tasks = await taskCollection.find().toArray();
        res.json(tasks);
    } catch {
        res.status(500).json({ error: "Failed to add task" });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await taskCollection.deleteOne({ _id: new ObjectId(id) });
        const tasks = await taskCollection.find().toArray();
        res.json(tasks);
    } catch {
        res.status(400).json({ error: "Invalid task id" });
    }
});

app.patch("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskCollection.findOne({ _id: new ObjectId(id) });
        await taskCollection.updateOne({ _id: task._id }, { $set: { completed: !task.completed } });
        const tasks = await taskCollection.find().toArray();
        res.json(tasks);
    } catch {
        res.status(400).json({ error: "Invalid task id" });
    }
});

// 📌 Schedule APIs
app.get("/api/schedule", async (req, res) => {
    try {
        const schedule = await scheduleCollection.find().toArray();
        res.json(schedule);
    } catch {
        res.status(500).json({ error: "Failed to fetch schedule" });
    }
});

app.post("/api/schedule", async (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ error: "Event name and time are required" });
    }
    try {
        await scheduleCollection.insertOne({ name, time });
        const schedule = await scheduleCollection.find().toArray();
        res.json(schedule);
    } catch {
        res.status(500).json({ error: "Failed to save schedule" });
    }
});

//user register
app.post("/api/register", async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }
    try {
        const user = await userCollection.findOne({ userName });
        if (user) return res.status(400).json({ error: "User already exists" });
        await userCollection.insertOne({ userName, password });
        res.json({ message: "User registered successfully" });
    } catch {
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await userCollection.findOne({ userName, password });
        if (!user) return res.status(401).json({ error: "Invalid username or password" });
        req.session.user = userName;
        res.json({ message: "Login successful", userName });
    } catch {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logout successful" });
});

app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true, userName: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
