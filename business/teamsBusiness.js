const departmentsProvider = require('../db/providers/departmentsProvider.js');

// SAVE API -----------------------------------------------------------------------------------------------------------------------------

async function saveAdjustInputCtx(ctx) {
    // gui is passing department guid, we need its id
    let inputParamGuid = ctx.request.body.departmentGuid;
    let departmentId = 0;
    await new Promise((resolve, reject) => {
        departmentsProvider.getIdByGuid(inputParamGuid, function(err,result) {
            departmentId = result;
            resolve();
        });
    });  
    console.log(departmentId);
    ctx.request.body.departmentId = 999;
    return ctx;
}

// SAVE API -----------------------------------------------------------------------------------------------------------------------------


module.exports = { saveAdjustInputCtx }