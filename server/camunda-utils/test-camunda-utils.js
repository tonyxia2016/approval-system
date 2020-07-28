const bpmClient = require("./CamundaUtils");

// bpmClient
//   .createApplication({
//     state: "初审",
//     type: "高价值件",
//     application: "xiawei",
//     startDate: "2020-7-24"
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

bpmClient
  .getTaskList("lijie", ["组长", "高价值件初审"])
  .then(res => {
    console.log(res);
    console.log(res[0].approver.value);
  })
  .catch(err => {
    console.log(err);
  });
