const fs = require("fs");
const path = require("path");

// Define the path for the log file
const logDirPath = path.join(__dirname, "../logs");
const logFilePath = path.join(logDirPath, "requests.log");

// Function to ensure that the logs directory exists
const ensureLogDirectoryExists = () => {
  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath);
  }
};

const requestLogger = (req, res, next) => {
  ensureLogDirectoryExists();
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  next();
};

module.exports = { requestLogger };
