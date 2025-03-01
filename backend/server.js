const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 5001; // Intermediate API port

const EHR_SAVE_PATH = path.join(__dirname, "ehr_data.json");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Function to append data to JSON file
const appendToJson = (newData) => {
    let ehrList = [];

    if (fs.existsSync(EHR_SAVE_PATH)) {
        try {
            const fileData = fs.readFileSync(EHR_SAVE_PATH, "utf8");
            ehrList = JSON.parse(fileData);
            if (!Array.isArray(ehrList)) ehrList = [];
        } catch (error) {
            console.error("Error reading JSON file:", error);
            ehrList = [];
        }
    }

    ehrList.push(newData);

    fs.writeFileSync(EHR_SAVE_PATH, JSON.stringify(ehrList, null, 4), "utf8");
};

// Proxy endpoint to send text to Flask API
app.post("/process_text", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "No text provided" });

        const flaskResponse = await axios.post(
            "https://ehr-api-demo.loca.lt/process_text",
            { text },
            { headers: { "Content-Type": "application/json" } }
        );

        const ehrData = flaskResponse.data;
        appendToJson(ehrData); // ✅ Append extracted data to JSON file

        res.json(ehrData);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to process text" });
    }
});

// Start Express server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
