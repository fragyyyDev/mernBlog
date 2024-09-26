import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv'; // Correct import for dotenv

// Load environment variables from the .env file
dotenv.config();

// Sign up a new user
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if required fields are provided and valid
  if (!username || !email || !password || username.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Hash the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user in the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    // Catch and forward any errors (e.g., database issues)
    next(error);
  }
};

// Login an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, 'User not found')); // Return 401 for unauthorized access
    }

    // Verify if the password matches the hashed password in the database
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid password')); // Return 401 for invalid credentials
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id },            // Payload with user ID
      process.env.JWT_SECRET,      // Secret key from environment variable
      { expiresIn: '1d' }          // Token expiration (1 day)
    );

    // Remove password from the user object before sending the response
    const { password: hashedPassword, ...userDetails } = user._doc;

    // Set the token as an HTTP-only cookie and send the user data in the response
    res.status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(userDetails);
  } catch (error) {
    // Log the error and forward it to the error handler
    console.error('Login Error:', error);
    next(error);
  }
};
