const Router = require('@koa/router');

// Prefix all routes with: /items
const routerDepartments = new Router({
  prefix: '/departments',
});

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

routerDepartments.get('/list', (ctx, next) => {
  ctx.body = departmentsRecords;
  next();
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
