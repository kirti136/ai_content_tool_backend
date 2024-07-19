const express = require("express");
const router = express.Router();
const textAnalysisController = require("../controllers/textAnalysis.controller");
// const {
//   registerValidationRules,
//   loginValidationRules,
//   validate,
// } = require("../middlewares/validation.middleware");
// const { verifyToken } = require("../middlewares//authentication.middleware");
// const { authorizeRoles } = require("../middlewares/authorization.middleware");

router.post("/", textAnalysisController.createAnalysis);

module.exports = router;
