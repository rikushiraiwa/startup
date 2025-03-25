import { MongoClient } from "mongodb";
import config from "./dbConfig.json" assert { type: "json" };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");

export const journalCollection = db.collection("journal");
export const goalsCollection = db.collection("goals");
export const tasksCollection = db.collection("tasks");
export const scheduleCollection = db.collection("schedule");
export const usersCollection = db.collection("users");

// 接続テスト
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();
