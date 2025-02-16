const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample law database (Replace with real database later)
const laws = [
  { id: 1, title: "Contract Law", description: "Legal agreements between parties." },
  { id: 2, title: "Property Law", description: "Rights related to property ownership." },
  { id: 3, title: "Criminal Law", description: "Offenses and punishments under law." },
];

// Search endpoint
app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.json({ laws: [] });
  }

  const results = laws.filter(
    (law) => law.title.toLowerCase().includes(query) || law.description.toLowerCase().includes(query)
  );

  res.json({ laws: results });
});

// Root route
app.get("/", (req, res) => {
  res.send("Intelligent Law API is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
