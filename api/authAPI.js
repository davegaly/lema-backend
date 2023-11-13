const Router = require('@koa/router');
const basicAuth = require('koa-basic-auth');
const jwt = require('jsonwebtoken');
const authBusiness  = require('../business/authBusiness.js');
const usersProvider = require('../db/providers/usersProvider.js');

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

        // todo look for a valid username/password combination
        console.log("authAPI->looking for username/password match in db");
        let usernamePasswordMatchFound = false;

        ctx.body = "test";
        
        // user data provider for username/password
        let dbQueryParams = { username: username, password: password};
        usersProvider.getByUsernamePassword(dbQueryParams, function(err,result) {
            console.log("authAPI->login " + JSON.stringify(result));
        });  

        /*
        // if a record was found, we issue a token for it
        if (usernamePasswordMatchFound == true) {
            const token = jwt.sign({ username }, 'abcde', { expiresIn: '10d' });
            ctx.body = { token };
        } else {
            ctx.status = 401;
            ctx.body = 'Invalid credentials';
        }
        */

        resolve();

    });    
});  

module.exports = authRouter;