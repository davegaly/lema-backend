const sqlite3 = require("sqlite3").verbose();
const filepath = "./db/main.db";


// get by id
async function getById(id, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.log(error.message);
        }
        db.serialize(() => {
            let result = {};
            db.each(`SELECT * FROM departments WHERE id = ?`, [id], (error, row) => {
                if (error) {
                    return console.log(error);
                }
                let newDepartment = {id: row.id, name: row.name};
                result = newDepartment;
            },
            function() {
                callback(null, result);
            });
        });
    });
}

// list all
async function list(callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        db.serialize(() => {
            let result = [];
            db.each(`SELECT * FROM departments`, (error, row) => {
                if (error) {
                    return console.log(error);
                }
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
        if (params.id > 0) {
            db.serialize(() => {
                db.prepare(`UPDATE departments (name) VALUES (?) WHERE id=?`, [params.name, params.id]).run().finalize();
                db.close();
            });
            console.log("Department updated");
        }
        else
        {
            db.serialize(() => {
                db.prepare(`INSERT INTO departments (name) VALUES (?)`, params.name).run().finalize();
                db.close();
            });
            console.log("Department added");
        }
    });
}


module.exports = { getById, list }