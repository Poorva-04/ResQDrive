// backend/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({ name, email, password: hashedPassword, userType });

  res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email, userType: newUser.userType } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    userType: user.userType.charAt(0).toUpperCase() + user.userType.slice(1).toLowerCase(),
    userId: user.id
  });
  
};

module.exports = { register, login };
