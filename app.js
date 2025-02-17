const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ? Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request bodies

// ? Connect to MongoDB
const uri = process.env.MONGO_URI; // MongoDB connection string from .env
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("intelligentLawDB"); // Replace with your database name
        console.log("? Connected to MongoDB");
    } catch (error) {
        console.error("? MongoDB connection failed:", error);
        process.exit(1);
    }
}

connectDB(); // Call database connection function

// ? Search API
app.get("/search", async (req, res) => {
    const query = req.query.q; // Get search term from URL

    if (!query) {
        return res.status(400).json({ error: "Search query is required" });
    }

    try {
        const results = await db.collection("commonLaws").find({
            lawText: { $regex: query, $options: "i" }
        }).toArray();

        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ message: "No results found" });
        }
    } catch (error) {
        console.error("? Search error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ? Test Route (Check MongoDB Connection)
app.get("/test-db", async (req, res) => {
    try {
        const count = await db.collection("commonLaws").countDocuments();
        res.json({ message: `Database connected. Total documents: ${count}` });
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

// ? Start Server
app.listen(PORT, () => {
    console.log(`?? Server running on port ${PORT}`);
});
