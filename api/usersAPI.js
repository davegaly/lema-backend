const Router = require('@koa/router');
const usersProvider = require('../db/providers/usersProvider.js');
const usersBusiness  = require('../business/usersBusiness.js');
const authBusiness  = require('../business/authBusiness.js');

// Prefix all routes with: /items
const usersRouter = new Router({
  prefix: '/api/users',
});



// getByUsernamePassword
usersRouter.get('/getByUsernamePassword/:username/:password', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("usersAPI->getByUsernamePassword, with params " + JSON.stringify(ctx.params) + " Started");
    usersProvider.getByUsernamePassword(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("usersAPI->getByUsernamePassword finished");
      resolve();
    });    
  }); 
});

// listAll
usersRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("usersAPI->listAll Started");
    if (usersBusiness.listAllAdjustInputCtx !== undefined) {
      await usersBusiness.listAllAdjustInputCtx(ctx);
    }
    usersProvider.listAll(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("usersAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
usersRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise(async (resolve, reject) => {    
    if (usersBusiness.saveAdjustInputCtx !== undefined) {
      await usersBusiness.saveAdjustInputCtx(ctx);
    }
    let params = {id: ctx.request.body.id, username: ctx.request.body.username, password: ctx.request.body.password, isEnabled: ctx.request.body.isEnabled, settings: ctx.request.body.settings};
    console.log("usersAPI->save(" + JSON.stringify(params) + ") Started");
    usersProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("usersAPI->save finished");
      resolve();
    });    
  });  
});

// updatePassword
usersRouter.post('/updatePassword', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise(async (resolve, reject) => {    
    if (usersBusiness.updatePasswordAdjustInputCtx !== undefined) {
      await usersBusiness.updatePasswordAdjustInputCtx(ctx);
    }
    let params = {id: ctx.request.body.id, username: ctx.request.body.username, password: ctx.request.body.password, isEnabled: ctx.request.body.isEnabled, settings: ctx.request.body.settings};
    console.log("usersAPI->updatePassword(" + JSON.stringify(params) + ") Started");
    usersProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("usersAPI->updatePassword finished");
      resolve();
    });    
  });  
});

module.exports = usersRouter;