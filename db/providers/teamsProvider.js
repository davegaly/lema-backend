async function getByGuid(guid, callback) {
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("teamsProvider->getByGuid Started");
            db.each(`SELECT * FROM teams WHERE guid = ?`, [guid], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
id: row.id,					name: row.name,
					departmentId: row.departmentId,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("teamsProvider->getByGuid Finished (callback)");
                callback(null, result);
            });
        });
    });
}

