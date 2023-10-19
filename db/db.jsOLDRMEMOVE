const sqlite3 = require("sqlite3").verbose();
const filepath = "./db/main.db";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

function createTables() {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        db.serialize(() => {
            db.prepare(`CREATE TABLE IF NOT EXISTS departments (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(150) NOT NULL)`).run().finalize();
            db.close();
        });
        console.log("Tables are fine");
    });
}

function insertDepartment(params) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        db.serialize(() => {
            db.prepare(`INSERT INTO departments (name) VALUES (?)`, params.name).run().finalize();
            db.close();
        });
        console.log("Department added");
    });
}

async function listDepartments(callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        
        db.serialize(() => {
            let result = [];
            db.each(`SELECT * FROM departments`, (error, row) => {
                let newDepartment = {id: row.id, name: row.name};
                result.push(newDepartment);
            },
            function() {
                callback(null, result);
            });

        });
    });
}



module.exports = { 
    createDbConnection,
    createTables, 
    insertDepartment,
    listDepartments };