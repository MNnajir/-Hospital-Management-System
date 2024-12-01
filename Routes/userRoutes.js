// routes/userRoutes.js
const express = require("express");
const userController = require("../Controllers/userControllers");
const { authenticateToken, authorizeRoles } = require("../middlerware/authentication");

const router = express.Router();

// Register a new user
router.post("/register", userController.register);
// Login user
router.post("/login", userController.loginUser);

//  Create a new user Secured routes
router.post("/create", authenticateToken, authorizeRoles(["admin"]), userController.createUser);
// Get all users
router.get("/users", authenticateToken, userController.getAllUsers);
// Get user by ID
router.get("/user/:id", authenticateToken, userController.getUserById);
// Update user details
router.put("/user/:id", authenticateToken, authorizeRoles(["admin", "doctor"]), userController.updateUser);
// Delete a user
router.delete("/user/:id", authenticateToken, authorizeRoles(["admin"]), userController.deleteUser);

module.exports = router;
