const axios = require("axios");

(async () => {
  const rest = axios.create({
    baseURL: "http://localhost:8080/engine-rest",
    headers: { "Content-Type": "application/json" }
  });

  // 启动 process instance
  rest
    .post("/message", {
      messageName: "intermediateMsg",
      correlationKeys: {
        city: {
          value: "北京",
          type: "String"
        }
      },
      processVariables: {
        city: {
          value: "武汉"
        }
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  // rest
  //   .post("/message", {
  //     messageName: "startMsg",
  //     processVariables: {
  //       city: {
  //         value: "北京",
  //         type: "String"
  //       }
  //     }
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
})();
