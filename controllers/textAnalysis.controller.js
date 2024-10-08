require("dotenv").config();
const TextAnalysis = require("../models/textAnalysis.model");
const Summarizer = require("node-summarizer").Summarizer;

// TextRazor client
const TextRazor = require("textrazor");
const textRazor = new TextRazor(process.env.TEXTRAZOR_API_KEY);

const analyzeText = async (text) => {
  const options = { extractors: "entities,topics,keywords,sentiment" };

  try {
    const response = await textRazor.exec(text, options);
    return {
      summary: "Summary",
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

exports.createAnalysis = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text content is required" });
    }

    const { summary, insights } = await analyzeText(text);

    const analysis = new TextAnalysis({ text, summary, insights });
    await analysis.save();

    res.json({ text, summary, insights });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
