require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TextAnalysis = require("../models/textAnalysis.model");

// Define your TextRazor client (replace with actual initialization)
const TextRazor = require("textrazor");
const textRazor = new TextRazor(process.env.TEXTRAZOR_API_KEY);

const analyzeText = async (text) => {
  const options = { extractors: "entities,topics,keywords,sentiment" };

  try {
    const response = await textRazor.exec(text, options);
    return {
      summary: "Summary", // Generate a summary here
      insights: {
        entities: response.response.entities || [],
        topics: response.response.topics || [],
        keywords: response.response.keywords || [],
        coarseTopics: response.response.coarseTopics || [],
        sentiment: response.response.sentiment || [],
      },
    };
  } catch (error) {
    throw new Error("TextRazor analysis failed: " + error.message);
  }
};

const createAnalysis = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text content is required" });
    }

    const { summary, insights } = await analyzeText(text);

    const analysis = new TextAnalysis({ text, summary, insights });
    await analysis.save();

    res.json({ summary, insights });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAnalysis,
};
