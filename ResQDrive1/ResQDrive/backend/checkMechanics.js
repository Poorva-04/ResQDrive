// backend/checkMechanics.js
const Database = require('better-sqlite3');
const db = new Database('./database/resqdrive.db');

const rows = db.prepare('SELECT * FROM mechanics').all();
console.log(`Total Mechanics: ${rows.length}`);
console.table(rows);
