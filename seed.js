const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://Maryam-sepehri:Maryam%40527@cluster.mongodb.net/intelligentLawDB?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const LawSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String
});

const LawModel = mongoose.model("CommonLaw", LawSchema);

const sampleLaws = [
    {
        title: "Contract Law - Offer and Acceptance",
        content: "In Ontario, a contract is legally binding if it has an offer, acceptance, and consideration...",
        category: "Contract Law"
    },
    {
        title: "Employment Law - Minimum Wage",
        content: "The Employment Standards Act sets the minimum wage in Ontario, which is currently $16.55 per hour...",
        category: "Employment Law"
    }
];

LawModel.insertMany(sampleLaws)
    .then(() => {
        console.log("? Sample laws inserted successfully");
        mongoose.connection.close();
    })
    .catch(err => console.error("? Error inserting laws:", err));
