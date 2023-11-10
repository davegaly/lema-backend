//------------------------------------------------------
// THIS FILE IS AUTOGENERATED
// DO NOT APPLY MANUAL MODIFICATIONS IN THIS FILE!
//------------------------------------------------------

const sqlite3 = require("sqlite3").verbose();
const uuid = require('uuid');
const filepath = "./db/main.sqlite";
const sharedDBMethods = require('../../db/sharedDBFunctions.js');

async function getIdByGuid(guid, callback) {
    console.log("usersProvider->getIdByGuid called with guid " + guid);
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = -1;
            db.get(`SELECT id FROM users WHERE guid=? LIMIT 1`, [guid], (error, row) => {
                console.log("usersProvider->getIdByGuid returned row obj " + JSON.stringify(row));
                console.log("usersProvider->getIdByGuid sql Error:" + error);
                result = row.id;
                console.log("usersProvider->getIdByGuid this is the result: " + result);
                callback(null, result);
            });
        });
    });
}

async function listAll(params, callback) {
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("usersProvider->listAll Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM users `, [], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					username: row.username,
					isEnabled: row.isEnabled,
					settings: row.settings,
					guid: row.guid,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("usersProvider->listAll Finished (callback)");
                console.log("usersProvider->listAll this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

// save
async function save(params, callback) {
    console.log("usersProvider->save Started: " + JSON.stringify(params));
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                console.log("usersProvider->save(update) Started");
                db.prepare(`UPDATE users SET username=?,isEnabled=?,settings=? WHERE id=?`, [params.username,params.isEnabled,params.settings,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("usersProvider->save(update) Finished");
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                console.log("usersProvider->save(insert) Started");
                const uniqueUUID = uuid.v4();
                console.log("usersProvider->save Generated guid for new record: " + uniqueUUID);
                db.prepare(`INSERT INTO users (username,isEnabled,settings,guid,isDeleted) VALUES (?,?,?,?,?)`, [params.username,params.isEnabled,params.settings,uniqueUUID,0]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("usersProvider->save(insert) Finished");
                callback(null, "ok");
            });            
        }
    });
}

// save
async function updatePassword(params, callback) {
    console.log("usersProvider->updatePassword Started: " + JSON.stringify(params));
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                console.log("usersProvider->updatePassword(update) Started");
                db.prepare(`UPDATE users SET password=? WHERE id=?`, [params.password,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("usersProvider->updatePassword(update) Finished");
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                console.log("usersProvider->updatePassword(insert) Started");
                const uniqueUUID = uuid.v4();
                console.log("usersProvider->updatePassword Generated guid for new record: " + uniqueUUID);
                db.prepare(`INSERT INTO users (,guid,isDeleted) VALUES (,?,?)`, [,uniqueUUID,0]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("usersProvider->updatePassword(insert) Finished");
                callback(null, "ok");
            });            
        }
    });
}



module.exports = { getIdByGuid,listAll,save,updatePassword, }