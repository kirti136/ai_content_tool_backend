const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  keyFilename: "path/to/your/service-account-file.json",
});

const analyzeText = async (text) => {
  try {
    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };

    const [result] = await client.analyzeSyntax({ document });
    const sentences = result.sentences.map(sentence => sentence.text.content);
    const summary = sentences.join(" ");

    const [sentimentResult] = await client.analyzeSentiment({ document });
    const sentiment = sentimentResult.documentSentiment;

    return { summary, sentiment };
  } catch (error) {
    console.error("ERROR:", error);
    throw new Error("Failed to analyze text");
  }
};

module.exports = { analyzeText };
