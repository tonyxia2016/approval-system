const bpmClient = require("./CamundaUtils");

bpmClient
  .createApplication({
    state: "初审",
    type: "包干修复",
    application: "xiawei",
    startDate: "2020-7-24"
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
