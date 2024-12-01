// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const asyncWrapper = require('../middlerware/async')
const CustomAPIError = require('../Error/custom-error');

 
// Register a new user
exports.register = asyncWrapper(async (req, res) => {
  const { username, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ 
    username, 
    role, 
    password: hashedPassword 
  });
 
 
  await newUser.save();
  res.status(201).json({ id: newUser._id, username: newUser.username })
});
exports.createUser = asyncWrapper(async (req, res) => {
    const { username, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ id: newUser._id, username: newUser.username })
    //res.status(201).json({user: newUser });
    
  
});

// Login user and generate JWT
exports.loginUser = asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
       return next(new CustomAPIError("Invalid username or password!", 401));
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new CustomAPIError("Invalid username or password!", 401));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ message: "Login successful!", token });
  
});

// Get all users
exports.getAllUsers = asyncWrapper(async (req, res, next) => {
      const users = await User.find({});
      //console.log("Fetched users:", users); // Debugging output

      // Check if no users are found
      if (!users || users.length === 0) {
          return next(new CustomAPIError("No users found!", 404));
      }

      // Send the list of users
      res.status(200).json({
          success: true,
          data: users,
      });
});


// Get user by ID
exports.getUserById = asyncWrapper( async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next( new CustomAPIError("User not found!", 404));
    }
    res.status(200).json(user);
  
});

// Update user details
exports.updateUser = asyncWrapper( async (req, res, next) => {
    const { username, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new CustomAPIError("User not found!", 404));
    }

    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
});

// Delete a user
exports.deleteUser = asyncWrapper(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(new CustomAPIError("User not found!", 404));
    }

    res.status(200).json({ message: "User deleted successfully!" });
  
});
