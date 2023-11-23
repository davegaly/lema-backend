const filepath = "./db/main.sqlite";

// returns the path to the database file, according to the SERVER_ENV in the .env file
function returnDBPath() {
    
    const serverENV = process.env['KOA_SERVER_ENV'];

    if (serverENV == 'dev') {
        return "./db/dev.sqlite";
    }

    if (serverENV == 'prod') {
        return "./db/main.sqlite";
    }
}

module.exports = { returnDBPath }