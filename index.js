require("dotenv").config();
const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const basicAuth = require('koa-basic-auth');
const https = require('https');
const fs = require('fs');

console.log("App is starting");
console.log("");


/*
const fs = require('fs');
fs.writeFile('/localFolder/output.txt', 'davide', (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File written successfully!');
  }
});
*/


console.log("Checking mandatory .env settings");
const settingsServerENV = process.env["KOA_SERVER_ENV"];
console.log("SERVER_ENV: " + settingsServerENV);
if (settingsServerENV == undefined) {
  console.log("Could not retrieve SERVER_END in .env file. Shutting down...");
  return;
}
const settingsListeningPortENV = process.env["KOA_LISTENING_PORT"];
console.log("LISTENING_PORT: " + settingsListeningPortENV);
if (settingsListeningPortENV == undefined) {
  console.log("Could not retrieve SERVER_END in .env file. Shutting down...");
  return;
}
const settingsAuthSecretENV = process.env["KOA_AUTH_SECRET"];
console.log("AUTH_SECRET: " + settingsAuthSecretENV);
if (settingsAuthSecretENV == undefined) {
  console.log("Could not retrieve AUTH_SECRET in .env file. Shutting down...");
  return;
}
const settingsSecureENV = process.env["KOA_SECURE"];
console.log("SECURE: " + settingsSecureENV);
if (settingsSecureENV == undefined) {
  console.log("Could not retrieve SECURE in .env file. Shutting down...");
  return;
}

const app = new Koa();

console.log("Start reading certificates");
const httpCreateServerOptions = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem'),
};
console.log("End reading certificates");

console.log("Configuring http server");
const httpServer = https.createServer(httpCreateServerOptions, app.callback());
console.log("Finished starting http server");

// middlewares

app.use(logger());
app.use(cors());
app.use(koaBody());
app.use(bodyParser());

// routes from api files
let departmentsAPI = require("./api/departmentsAPI.js");
let teamsAPI = require("./api/teamsAPI.js");
let employeesAPI = require("./api/employeesAPI.js");
let employeesTeamsAPI = require("./api/employeesTeamsAPI.js");
let usersAPI = require("./api/usersAPI.js");
let authAPI = require("./api/authAPI.js");
let testAPI = require("./api/testAPI.js");

app.use(departmentsAPI.routes());
app.use(teamsAPI.routes());
app.use(employeesAPI.routes());
app.use(employeesTeamsAPI.routes());
app.use(usersAPI.routes());
app.use(authAPI.routes());
app.use(testAPI.routes());

console.log("All good. All ready. Fire some API to see things. Starting server...");

httpServer.listen(settingsListeningPortENV);
