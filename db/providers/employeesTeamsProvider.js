//------------------------------------------------------
// THIS FILE IS AUTOGENERATED
// DO NOT APPLY MANUAL MODIFICATIONS IN THIS FILE!
//------------------------------------------------------

const sqlite3 = require("sqlite3").verbose();
const uuid = require('uuid');
const filepath = "./db/main.sqlite";
const sharedDBMethods = require('../../db/sharedDBFunctions.js');

async function getIdByGuid(guid, callback) {
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = -1;
            db.each(`SELECT id FROM employeesTeams WHERE guid=?`, [guid], (error, row) => {
                console.log("this my row" + JSON.stringify(row));
                if (error) {return console.log(error);}
                result = row.id;
            },
            function() {
                console.log("employeesTeamsProvider->getIdByGuid Finished (callback)");
                console.log("employeesTeamsProvider->getIdByGuid this is the result: " + result);
                callback(null, result);
            });
        });
    });
}

async function listTeamsForEmployee(params, callback) {
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("employeesTeamsProvider->listTeamsForEmployee Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM employeesTeams WHERE employeeId=?`, [params.employeeId,], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					teamId: row.teamId,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("employeesTeamsProvider->listTeamsForEmployee Finished (callback)");
                console.log("employeesTeamsProvider->listTeamsForEmployee this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

async function listEmployeesForTeam(params, callback) {
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("employeesTeamsProvider->listEmployeesForTeam Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM employeesTeams WHERE teamId=?`, [params.teamId,], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					employeeId: row.employeeId,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("employeesTeamsProvider->listEmployeesForTeam Finished (callback)");
                console.log("employeesTeamsProvider->listEmployeesForTeam this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

// save
async function save(params, callback) {
    console.log("employeesTeamsProvider->save Started: " + JSON.stringify(params));
    const db = new sqlite3.Database(sharedDBMethods.returnDBPath(), (error) => {
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                console.log("employeesTeamsProvider->save(update) Started");
                db.prepare(`UPDATE employeesTeams SET employeeId=?,teamId=? WHERE id=?`, [params.employeeId,params.teamId,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("employeesTeamsProvider->save(update) Finished");
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                console.log("employeesTeamsProvider->save(insert) Started");
                const uniqueUUID = uuid.v4();
                console.log("Generated guid for new record: " + uniqueUUID);
                db.prepare(`INSERT INTO employeesTeams (employeeId,teamId,guid,isDeleted) VALUES (?,?,?,?)`, [params.employeeId,params.teamId,uniqueUUID,0]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("employeesTeamsProvider->save(insert) Finished");
                callback(null, "ok");
            });            
        }
    });
}



module.exports = { getIdByGuid,listTeamsForEmployee,listEmployeesForTeam,save, }