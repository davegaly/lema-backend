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
            console.log("teamsProvider->getById Started");
            db.each(`SELECT * FROM teams WHERE id = ?`, [id], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
					departmentId: row.departmentId,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("teamsProvider->getById Finished (callback)");
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
            console.log("teamsProvider->listall Started");
            db.each(`SELECT * FROM teams`, (error, row) => {
                if (error) {return console.log(error);}
                let newRecord = 
				{
id: row.id,					name: row.name,
					departmentId: row.departmentId,
				}                
                result.push(newRecord);
            },
            function() {
                console.log("teamsProvider->listAll Finished (result count:" + result.length + ")");
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
                console.log("teamsProvider->save(update) Started");
                db.prepare(`UPDATE teams SET name=?,departmentId=? WHERE id=?`, [params.name,params.departmentId,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("teamsProvider->save(update) Finished");
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                console.log("teamsProvider->save(insert) Started");
                db.prepare(`INSERT INTO teams (name,departmentId) VALUES (?,?)`, [params.name,params.departmentId]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("teamsProvider->save(insert) Finished");
                callback(null, "ok");
            });            
        }
    });
}


module.exports = { getById, listAll, save }