//const employeesTeamsProvider = require('../db/providers/employeesTeamsBusinessProvider.js');

// LIST TEAMS FOR EMPLOYEE API -----------------------------------------------------------------------------------------------------------------------------

/*
function listTeamsForEmployeeAdjustInputCtx(ctx) {
    // gui is passing employee guid, we need its id
    let inputParamGuid = ctx.request.body.employeeGuid;
    let employeeId = 0;  
    employeesTeamsProvider.getIdByGuid(inputParamGuid, function(err,result) {
        employeeId = result;
        ctx.request.body.employeeId = employeeId;
    });  
}
*/

// LIST TEAMS FOR EMPLOYEE API -----------------------------------------------------------------------------------------------------------------------------


module.exports = { }