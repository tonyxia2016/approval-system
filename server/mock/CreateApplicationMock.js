const Mock = require("mockjs");
const moment = require("moment");
const axios = require("axios");
const client = axios.create({
  baseURL: "http://localhost:3000/rest",
  headers: { "Content-Type": "application/json" }
});
const applicantName = {
  xiawei: "夏伟",
  guoping: "郭平"
};

for (let i = 0; i < 10; i++) {
  let applicationDetail = Mock.mock({
    "type|1": ["包干修复", "高价值件", "总成部件", "调价申请"],
    "applicant|1": ["xiawei", "guoping"],
    startDate: () => {
      const time1 = Mock.Random.natural(1593584000, 1595916800);
      return moment.unix(time1).toDate();
    },
    caseNo: "PICC-@string('number', 15)",
    plateNo: /(鄂A-)([0-9]|[A-Z]){5}/,
    "vehicleModel|1": ["奔驰", "宝马", "奥迪", "特斯拉"],
    repairePlant: "4S店",
    actualCost: "@natural(1000, 1500000)",
    evaluationCost: "@natural(1000, 1500000)",
    purchasePrice: "@natural(1000, 1500000)",
    agreementAmount: "@natural(1000, 1500000)",
    investigator: "@cname",
    investigateLocation: "定损地点",
    investigateDate: () => {
      const time1 = Mock.Random.natural(1593584000, 1595916800);
      return moment.unix(time1).toDate();
    },
    identifier: "@string('number', 8)",
    insurer: "武汉人保",
    insured: "@cname",
    finalAmount: "@natural(1000, 1500000)",
    deductible: "自付比例",
    occurredDate: () => {
      const time1 = Mock.Random.natural(1593584000, 1595916800);
      return moment.unix(time1).toDate();
    },
    offerDate: () => {
      const time1 = Mock.Random.natural(1593584000, 1595916800);
      return moment.unix(time1).toDate();
    },
    quotedAmount: "@natural(1000, 1500000)",
    targetAmount: "@natural(1000, 1500000)"
  });
  applicationDetail.applicantName = applicantName[applicationDetail.applicant];

  let opt = {
    url: "/application/create",
    method: "post",
    data: applicationDetail
  };

  // console.log(applicationDetail);
  client
    .request(opt)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.message);
    });
}
