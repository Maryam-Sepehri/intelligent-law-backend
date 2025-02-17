const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('? Connected to MongoDB Atlas');
}).catch(err => {
    console.error('? MongoDB Connection Error:', err);
});


const LawSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String
});

const LawModel = mongoose.model("CommonLaw", LawSchema);

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query parameter missing" });

    try {
        const results = await LawModel.find({ content: { $regex: query, $options: "i" } });
        if (results.length === 0) {
            return res.json({ message: "No results found" });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(5000, () => {
    console.log("? Server running on port 5000");
});
