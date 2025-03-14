import express from "express";
import cors from "cors";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
