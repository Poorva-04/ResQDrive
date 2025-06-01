const db = require('../config/dbConfig');

// Create Users table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    userType TEXT NOT NULL, -- 'User', 'Mechanic', or 'Admin'
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// User-related database operations
const createUser = (user) => {
  const stmt = db.prepare(`INSERT INTO users (name, email, password, userType) VALUES (?, ?, ?, ?)`);
  const info = stmt.run(user.name, user.email, user.password, user.userType);
  return { id: info.lastInsertRowid, ...user };
};

const getUserByEmail = (email) => {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
};

// Get all users
const getUsers = () => {
  return db.prepare(`SELECT * FROM users`).all();
};

// Get user by ID
const getUserById = (id) => {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
};

// Delete user by ID
const deleteUser = (id) => {
  return db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
};

// Update user details (for example, changing the userType or name)
const updateUser = (id, user) => {
  const stmt = db.prepare(`UPDATE users SET name = ?, email = ?, userType = ? WHERE id = ?`);
  const info = stmt.run(user.name, user.email, user.userType, id);
  return { id, ...user };
};

// Get user count
const getUserCount = () => {
  return db.prepare(`SELECT COUNT(*) AS count FROM users`).get().count;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserCount
};
