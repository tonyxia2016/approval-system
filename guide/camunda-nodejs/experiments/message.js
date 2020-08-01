const axios = require("axios");

(async () => {
  const rest = axios.create({
    baseURL: "http://localhost:9001/engine-rest",
    headers: { "Content-Type": "application/json" }
  });

  // 启动 process instance
  rest
    .post("/message", {
      messageName: "startMsg",
      processVariables: {
        city: {
          value: "北京",
          type: "String"
        }
      },
      resultEnabled: true,
      variablesInResultEnabled: true
    })
    .then(res => {
      console.log(res.data[0].variables.city);
    })
    .catch(err => {
      console.log(err.message);
    });

  // 发送中间消息
  // rest
  //   .post("/message", {
  //     messageName: "intermediateMsg",
  //     correlationKeys: {
  //       city: {
  //         value: "北京",
  //         type: "String"
  //       }
  //     },
  //     processVariables: {
  //       province: {
  //         value: "湖北",
  //         type: "String"
  //       },
  //       city: {
  //         value: "武汉",
  //         type: "String"
  //       }
  //     }
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
})();
