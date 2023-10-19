//------------------------------------------------------
// THIS FILE IS AUTOGENERATED
// DO NOT APPLY MANUAL MODIFICATIONS IN THIS FILE!
//------------------------------------------------------

const sqlite3 = require("sqlite3").verbose();
const filepath = "./db/main.sqlite";


// get by id
async function getById(id, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            db.each(`SELECT * FROM teams WHERE id = ?`, [id], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                callback(null, result);
            });
        });
    });
}


// list all
async function listAll(callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.error(error.message);}
        db.serialize(() => {
            let result = [];
            db.each(`SELECT * FROM teams`, (error, row) => {
                if (error) {return console.log(error);}
                let newRecord = 
				{
id: row.id,					name: row.name,
				}                
                result.push(newRecord);
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
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                db.prepare(`UPDATE teams SET name=? WHERE id=?`, [params.name,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                db.prepare(`INSERT INTO teams (name) VALUES (?)`, [params.name]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                callback(null, "ok");
            });            
        }
    });
}


module.exports = { getById, listAll, save }