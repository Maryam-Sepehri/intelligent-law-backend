const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample laws database (Replace with real DB later)
const laws = [
  { id: 1, title: "Contract Law", description: "Laws related to contracts and agreements." },
  { id: 2, title: "Property Law", description: "Laws governing property ownership and disputes." },
  { id: 3, title: "Criminal Law", description: "Laws related to crimes and punishments." }
];

// Search API
app.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = laws.filter(law => law.title.toLowerCase().includes(query));
  res.json(results);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
