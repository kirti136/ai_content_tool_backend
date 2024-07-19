const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../middlewares/validation.middleware");
const { verifyToken } = require("../middlewares//authentication.middleware");
const { authorizeRoles } = require("../middlewares/authorization.middleware");

// Register route
router.post(
  "/register",
  registerValidationRules(),
  validate,
  userController.register
);

// Login route
router.post("/login", loginValidationRules(), validate, userController.login);

// Logout route
router.post("/logout", verifyToken, userController.logout);

// Get all users route
router.get(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  userController.getAllUsers
);

module.exports = router;
