const Router = require('@koa/router');
const departmentsProvider = require('./db/departments/departmentsProvider.js');

// Prefix all routes with: /items
const routerDepartments = new Router({
  prefix: '/departments',
});

//dbFunctions.createDbConnection();
//dbFunctions.createTables();
//dbFunctions.insertDepartment({name:'HR'});
//dbFunctions.insertDepartment({name:'Business Sintesi'});

// Routes
routerDepartments.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

routerDepartments.get('/list', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.list(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

routerDepartments.post('/save', (ctx, next) => {
  console.log(ctx.request.body);
  /*
  let newItem = items.push({
    id: ctx.request.body.id,
    iname: ctx.request.body.iname,
    price: ctx.request.body.price
  });
		ctx.response.status = 201;
		ctx.body = `New item = added with id: ${ctx.request.body.id} & item name: ${
			ctx.request.body.iname
		}`;
    */
	next();
});


module.exports = routerDepartments;
