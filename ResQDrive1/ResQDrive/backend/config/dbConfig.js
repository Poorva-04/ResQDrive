// backend/config/dbConfig.js

const Database = require('better-sqlite3');
const path = require('path');

// Set up path to database
const dbPath = path.join(__dirname, '../database/resqdrive.db');

// Connect to SQLite database
const db = new Database(dbPath); 

// Export database connection
module.exports = db;
