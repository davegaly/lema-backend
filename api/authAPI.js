require("dotenv").config();
const Router = require('@koa/router');
const basicAuth = require('koa-basic-auth');
const jwt = require('jsonwebtoken');
const authBusiness  = require('../business/authBusiness.js');
const usersProvider = require('../db/providers/usersProvider.js');
const utils = require('../business/utils.js');

// Prefix all routes with: /auth
const authRouter = new Router({
    prefix: '/api/auth',
  });

// save
authRouter.post('/login', async (ctx, next) => {

    await new Promise(async (resolve, reject) => {    
        console.log("authAPI->login called");
        const { username, password } = ctx.request.body;
        console.log("authAPI->login param username:" + username);
        console.log("authAPI->login param password:" + password);
        
        // user data provider for username/password
        console.log("authAPI->looking for username/password match in db");
        let dbQueryParams = { username: username, password: password};
        usersProvider.getByUsernamePassword(dbQueryParams, function(err,result) {
            console.log("authAPI->login result from user dataprovider" + JSON.stringify(result));
            if (utils.isEmpty(result)) {
                console.log("authAPI->login no matching was found, issue 401")
                ctx.status = 401;
                ctx.body = 'Invalid credentials';
                resolve();
            } 
            else 
            {
                console.log("authAPI->login generating new token");
                const token = jwt.sign({ username }, process.env["AUTH_SECRET"], { expiresIn: '10d' });
                console.log("authAPI->login generated token " + token);
                ctx.body = { token };
            }
        });  

        resolve();

    });    
});  

module.exports = authRouter;