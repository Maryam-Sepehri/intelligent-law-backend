const app = require("./app"); // Import app.js
const PORT = process.env.PORT || 5000;

// ? Start Server
app.listen(PORT, () => {
    console.log(`?? Server running on port ${PORT}`);
});
