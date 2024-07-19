const path = require("path");
const fs = require("fs");
const Upload = require("../models/Upload");
const { analyzeText } = require("../services/naturalLanguageService");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Read the uploaded file
    const filePath = path.join(__dirname, "../uploads", file.filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Analyze the file content
    const analysisResults = await analyzeText(fileContent);
    const processedContent = analysisResults.summary;

    // Save file info and processed content to the database
    const newUpload = new Upload({
      originalName: file.originalname,
      fileName: file.filename,
      filePath: filePath,
      fileType: file.mimetype,
      fileSize: file.size,
      processedContent: processedContent,
    });

    await newUpload.save();

    // Remove the uploaded file from the filesystem
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({
        message: "File uploaded successfully",
        processedContent,
        analysisResults,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { uploadFile };

//************************************************************************************************** */

// const path = require("path");
// const fs = require("fs");
// const Upload = require("../models/Upload");

// const uploadFile = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     // Read the uploaded file
//     const filePath = path.join(__dirname, "../uploads", file.filename);
//     const fileContent = fs.readFileSync(filePath, "utf8");

//     // Process the file content (you can integrate AI service here in the next step)
//     const processedContent = fileContent; // Placeholder for now

//     // Save file info and processed content to the database
//     const newUpload = new Upload({
//       originalName: file.originalname,
//       fileName: file.filename,
//       filePath: filePath,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       processedContent: processedContent,
//     });

//     await newUpload.save();

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", processedContent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = { uploadFile };
// ************************************************************************************************************************
// const path = require("path");
// const fs = require("fs");
// const Upload = require("../models/Upload");

// const uploadFile = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     // Read the uploaded file
//     const filePath = path.join(__dirname, "../uploads", file.filename);
//     const fileContent = fs.readFileSync(filePath, "utf8");

//     // Process the file content (you can integrate AI service here in the next step)
//     const processedContent = fileContent; // Placeholder for now

//     // Save file info and processed content to the database
//     const newUpload = new Upload({
//       originalName: file.originalname,
//       fileName: file.filename,
//       filePath: filePath,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       processedContent: processedContent
//     });

//     await newUpload.save();

//     // Remove the uploaded file from the filesystem
//     fs.unlinkSync(filePath);

//     res.status(200).json({ message: "File uploaded successfully", processedContent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = { uploadFile };
