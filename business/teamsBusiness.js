const departmentsProvider = require('../db/providers/departmentsProvider.js');

// SAVE API -----------------------------------------------------------------------------------------------------------------------------

function saveAdjustInputCtx(ctx) {
    // gui is passing department guid, we need its id
    let inputParamGuid = ctx.request.body.departmentGuid;
    let departmentId = 0;  
    departmentsProvider.getIdByGuid(inputParamGuid, function(err,result) {
        departmentId = result;
        ctx.request.body.departmentId = departmentId;
    });  
}

// SAVE API -----------------------------------------------------------------------------------------------------------------------------


module.exports = { saveAdjustInputCtx }