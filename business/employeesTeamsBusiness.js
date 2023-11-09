const employeesProvider = require('../db/providers/employeesProvider.js');
const teamsProvider = require('../db/providers/teamsProvider.js');

// SAVE EMPLOYEE-TEAM -----------------------------------------------------------------------------------------------------------------------------

function saveAdjustInputCtx(ctx) {
    // gui is passing employee guid and team guid, we need their ids
    let inputParamEmployeeGuid = ctx.request.body.employeeGuid;
    let inputParamTeamGuid = ctx.request.body.teamGuid;
    let employeeId = 0;  
    let teamId = 0; 
    employeesProvider.getIdByGuid(inputParamEmployeeGuid, function(err,result) {
        employeeId = result;
        ctx.request.body.employeeId = employeeId;
        console.log("Business.saveAdjustInputCtx employeeId:" + employeeId);
    });  
    teamsProvider.getIdByGuid(inputParamTeamGuid, function(err,result) {
        teamId = result;
        ctx.request.body.teamId = teamId;
        console.log("Business.saveAdjustInputCtx teamId:" + teamId);
    });      
}

// SAVE EMPLOYEE-TEAM -----------------------------------------------------------------------------------------------------------------------------


module.exports = { saveAdjustInputCtx }