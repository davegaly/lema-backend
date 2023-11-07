const departmentsProvider = require('../db/providers/departmentsProvider.js');

// SAVE API -----------------------------------------------------------------------------------------------------------------------------

async function saveAdjustInputCtx(ctx) {
    // gui is passing department guid, we need its id
    let inputParamGuid = ctx.request.body.departmentGuid;
    let departmentId = 0;
    let resultCtx = ctx;

    departmentsProvider.getIdByGuid(inputParamGuid, function(err,result) {
        console.log("2.1 result:" + result);
        departmentId = result;
        console.log("2.2 deparmnetId:" + departmentId);
        resultCtx.request.body.departmentId = departmentId;
        console.log("2.3 ctx to return :" + JSON.stringify(resultCtx.request.body))
        return resultCtx;
    });  
}

// SAVE API -----------------------------------------------------------------------------------------------------------------------------


module.exports = { saveAdjustInputCtx }