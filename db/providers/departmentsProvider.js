async function getByGuid(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->getByGuid Started");
            db.each(`SELECT * FROM departments WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->getByGuid Finished (callback)");
                callback(null, result);
            });
        });
    });
}

async function listForGrid(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->listForGrid Started");
            db.each(`SELECT * FROM departments WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->listForGrid Finished (callback)");
                callback(null, result);
            });
        });
    });
}

async function listForDropdown(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->listForDropdown Started");
            db.each(`SELECT * FROM departments WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->listForDropdown Finished (callback)");
                callback(null, result);
            });
        });
    });
}

async function save(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->save Started");
            db.each(`SELECT * FROM departments WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->save Finished (callback)");
                callback(null, result);
            });
        });
    });
}

async function deleteLogic(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->deleteLogic Started");
            db.each(`SELECT * FROM departments WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->deleteLogic Finished (callback)");
                callback(null, result);
            });
        });
    });
}

