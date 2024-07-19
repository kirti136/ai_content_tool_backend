require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
const { requestLogger } = require("./middlewares/requestLogger.middleware.js");
const routes = require("./routes");
const TextRazor = require("textrazor");

// TextRazor API Key
const textRazor = new TextRazor(process.env.TEXTRAZOR_API_KEY);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/user", routes.userRouter);
// API Endpoint for Upload and Analyze
app.post("/api/upload", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text content is required" });
    }

    // Perform text analysis with TextRazor
    const options = { extractors: "entities,topics,keywords,sentiment" };

    textRazor
      .exec(text, options)
      .then((response) => {
        // Extract analysis results
        const summary = "Summary";
        const insights = {
          entities: response.response.entities || [],
          topics: response.response.topics || [],
          keywords: response.response.keywords || [],
          sentiment: response.response.sentiment || [],
        };

        res.json({ summary, insights });
      })
      .catch((error) => {
        console.error("Error processing text:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "AI Content" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
