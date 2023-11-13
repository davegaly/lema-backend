const Router = require('@koa/router');
const basicAuth = require('koa-basic-auth');
const jwt = require('jsonwebtoken');
const authBusiness  = require('../business/authBusiness.js');

// Prefix all routes with: /auth
const authRouter = new Router({
    prefix: '/api/auth',
  });

// save
authRouter.post('/login', async (ctx, next) => {

    await new Promise(async (resolve, reject) => {    
        
        const { username, password } = ctx.request.body;
        console.log("username:" + username);
        console.log("password:" + password);
        console.log("JWT" + jwt);

        if (username === "a" && password === "a") {
            const token = jwt.sign({ username }, 'abcde', { expiresIn: '1h' });
            ctx.body = { token };
            //ctx.body = "OK";
        } else {
            ctx.status = 401;
            ctx.body = 'Invalid credentials';
        }

        /*
        // Check if the credentials are valid (for demo purposes, use a secure method in a real application)
        if (username === users.username && password === users.password) {
            const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
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