const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/resqdrive.db');

// Enable foreign key constraint
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;', function (err) {
    if (err) {
      console.log('Error enabling foreign key constraints:', err.message);
    } else {
      console.log('✅ Foreign key constraints enabled');
    }
  });

  // Drop old tables
  db.run(`DROP TABLE IF EXISTS appointments;`);
  db.run(`DROP TABLE IF EXISTS mechanics;`);
  db.run(`DROP TABLE IF EXISTS users;`);

  // Create users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      userType TEXT CHECK(userType IN ('user', 'mechanic', 'admin')) NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create mechanics table
  db.run(`
    CREATE TABLE mechanics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      vehicleType TEXT NOT NULL
    );
  `);

  // Create appointments table
  db.run(`
    CREATE TABLE appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appointment_id TEXT UNIQUE,
      userName TEXT,
      mechanicId INTEGER,
      vehicle TEXT,
      problem TEXT,
      appointment_date TEXT,
      status TEXT DEFAULT 'pending',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mechanicId) REFERENCES mechanics(id)
    );
  `);
});

// Hash passwords
const hashedAdmin = bcrypt.hashSync("adminpass", 10);
const hashedUser = bcrypt.hashSync("userpass", 10);
const hashedMech = bcrypt.hashSync("mechpass", 10);

// Mechanics data (with corrected vehicle types)
const mechanics = [
  { name: 'Car Mech 1', email: 'car1@resq.com', phone: '1000000001', address: '21 King St, Mumbai, India, 400001', vehicleType: 'car' },
  { name: 'Car Mech 2', email: 'car2@resq.com', phone: '1000000002', address: '88 Elm St, Delhi, India, 110001', vehicleType: 'car' },
  { name: 'Car Mech 3', email: 'car3@resq.com', phone: '1000000003', address: '12 Park Rd, Bangalore, India, 560001', vehicleType: 'car' },
  { name: 'Car Mech 4', email: 'car4@resq.com', phone: '1000000004', address: '34 Hill Ave, Chennai, India, 600001', vehicleType: 'car' },
  { name: 'Car Mech 5', email: 'car5@resq.com', phone: '1000000005', address: '90 Lake View, Pune, India, 411001', vehicleType: 'car' },

  { name: 'Bike Mech 1', email: 'bike1@resq.com', phone: '2000000001', address: '123 Bike Ln, Jaipur, India, 302001', vehicleType: 'bike' },
  { name: 'Bike Mech 2', email: 'bike2@resq.com', phone: '2000000002', address: '56 Gear St, Lucknow, India, 226001', vehicleType: 'bike' },
  { name: 'Bike Mech 3', email: 'bike3@resq.com', phone: '2000000003', address: '32 Wheel Dr, Bhopal, India, 462001', vehicleType: 'bike' },
  { name: 'Bike Mech 4', email: 'bike4@resq.com', phone: '2000000004', address: '75 Chain Rd, Patna, India, 800001', vehicleType: 'bike' },
  { name: 'Bike Mech 5', email: 'bike5@resq.com', phone: '2000000005', address: '18 Helmet St, Surat, India, 395001', vehicleType: 'bike' },

  { name: 'Truck Mech 1', email: 'truck1@resq.com', phone: '3000000001', address: '41 Cargo Blvd, Kolkata, India, 700001', vehicleType: 'truck' },
  { name: 'Truck Mech 2', email: 'truck2@resq.com', phone: '3000000002', address: '72 Load Rd, Ahmedabad, India, 380001', vehicleType: 'truck' },
  { name: 'Truck Mech 3', email: 'truck3@resq.com', phone: '3000000003', address: '27 Freight Ave, Indore, India, 452001', vehicleType: 'truck' },
  { name: 'Truck Mech 4', email: 'truck4@resq.com', phone: '3000000004', address: '14 Heavy Rd, Kochi, India, 682001', vehicleType: 'truck' },
  { name: 'Truck Mech 5', email: 'truck5@resq.com', phone: '3000000005', address: '65 Haul St, Nagpur, India, 440001', vehicleType: 'truck' },

  { name: 'Jeep Mech 1', email: 'jeep1@resq.com', phone: '4000000001', address: '31 Safari Rd, Chandigarh, India, 160001', vehicleType: 'jeep' },
  { name: 'Jeep Mech 2', email: 'jeep2@resq.com', phone: '4000000002', address: '92 Trail St, Dehradun, India, 248001', vehicleType: 'jeep' },
  { name: 'Jeep Mech 3', email: 'jeep3@resq.com', phone: '4000000003', address: '66 Ridge Rd, Ranchi, India, 834001', vehicleType: 'jeep' },
  { name: 'Jeep Mech 4', email: 'jeep4@resq.com', phone: '4000000004', address: '17 Terrain Blvd, Raipur, India, 492001', vehicleType: 'jeep' },
  { name: 'Jeep Mech 5', email: 'jeep5@resq.com', phone: '4000000005', address: '53 Jungle Dr, Shimla, India, 171001', vehicleType: 'jeep' },

  { name: 'Scooter Mech 1', email: 'scooter1@resq.com', phone: '5000000001', address: '81 Glide Ln, Nashik, India, 422001', vehicleType: 'scooter' },
  { name: 'Scooter Mech 2', email: 'scooter2@resq.com', phone: '5000000002', address: '40 Zip Rd, Vadodara, India, 390001', vehicleType: 'scooter' },
  { name: 'Scooter Mech 3', email: 'scooter3@resq.com', phone: '5000000003', address: '12 Smooth Ave, Goa, India, 403001', vehicleType: 'scooter' },
  { name: 'Scooter Mech 4', email: 'scooter4@resq.com', phone: '5000000004', address: '27 Swift Blvd, Amritsar, India, 143001', vehicleType: 'scooter' },
  { name: 'Scooter Mech 5', email: 'scooter5@resq.com', phone: '5000000005', address: '37 Cruise St, Agra, India, 282001', vehicleType: 'scooter' }
];

// Insert data
db.serialize(() => {
  db.run('BEGIN TRANSACTION');

  const insertMechanic = db.prepare(`
    INSERT INTO mechanics (name, email, phone, address, vehicleType)
    VALUES (?, ?, ?, ?, ?)
  `);

  mechanics.forEach(m => {
    insertMechanic.run(m.name, m.email, m.phone, m.address, m.vehicleType);
  });
  insertMechanic.finalize();

  const insertUser = db.prepare(`
    INSERT INTO users (name, email, password, userType)
    VALUES (?, ?, ?, ?)
  `);

  // Insert mechanic users
  mechanics.forEach(m => {
    insertUser.run(m.name, m.email, hashedMech, 'mechanic');
  });

  // Insert admin and one sample user
  insertUser.run('Admin', 'admin@resq.com', hashedAdmin, 'admin');
  insertUser.run('Test User', 'user@resq.com', hashedUser, 'user');

  insertUser.finalize();

  db.run('COMMIT', (err) => {
    if (err) {
      console.error('❌ Commit failed:', err.message);
      db.run('ROLLBACK');
    } else {
      console.log("✅ Mechanics seeded.");
      console.log("✅ Admin and test user seeded.");
      console.log("✅ Database setup complete.");
    }
  });
});
