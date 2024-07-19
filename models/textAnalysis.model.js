const mongoose = require("mongoose");

const TextAnalysisSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    insights: {
      entities: [{ type: mongoose.Schema.Types.Mixed }],
      topics: [{ type: mongoose.Schema.Types.Mixed }],
      keywords: [{ type: mongoose.Schema.Types.Mixed }],
      coarseTopics: [{ type: mongoose.Schema.Types.Mixed }],
      sentiment: [{ type: mongoose.Schema.Types.Mixed }],
    },
  },
  { timestamps: true }
);

const TextAnalysis = mongoose.model("TextAnalysis", TextAnalysisSchema);

module.exports = TextAnalysis;
