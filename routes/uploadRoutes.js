const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { protect } = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("file"), uploadFile);

module.exports = router;
