const Router = require('@koa/router');
const dbFunctions = require('./db/db.js');

// Prefix all routes with: /items
const routerDepartments = new Router({
  prefix: '/departments',
});

//dbFunctions.createDbConnection();
//dbFunctions.createTables();
//dbFunctions.insertDepartment({name:'HR'});
//dbFunctions.insertDepartment({name:'Business Sintesi'});

let departmentsRecords = [
  { id: 100, iname: 'Quartz Analog Wrist Watch', price: 'US $4.99' },
  { id: 101, iname: 'Leather Peep Pump Heels', price: 'US $33.56' },
  { id: 102, iname: 'Apple iPod', price: 'US $219.99' },
  { id: 103, iname: 'Prince Phantom 97P Tennnis Racket', price: 'US $50.00' },
];

// Routes
routerDepartments.get('/get/:id', (ctx, next) => {
  let getCurrentDepartment = departmentsRecords.filter(function (department) {
    if (department.id == ctx.params.id) {
      return true;
    }
  });

  if (getCurrentDepartment.length) {
    ctx.body = getCurrentDepartment[0];
  } else {
    ctx.response.status = 404;
    ctx.body = 'Department Not Found';
  }
  next();
});

routerDepartments.get('/list', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    dbFunctions.listDepartments(function(err,result) {
      console.log(result);
      ctx.body = result;
      resolve();
      console.log("resolved");
    });    
  });
  
});

/*
router.post('/add', (ctx, next) => {
  let newItem = items.push({
    id: ctx.request.body.id,
    iname: ctx.request.body.iname,
    price: ctx.request.body.price
  });
		ctx.response.status = 201;
		ctx.body = `New item = added with id: ${ctx.request.body.id} & item name: ${
			ctx.request.body.iname
		}`;
	next();
});
*/

module.exports = routerDepartments;
