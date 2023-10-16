const sqlite3 = require("sqlite3").verbose();
const filepath = "./db/main.db";


// list all
async function list(callback) {
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


// save
async function save(params, callback) {
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


module.exports = { list }