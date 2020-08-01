const axios = require("axios");
const readlineSync = require("readline-sync");
const rest = axios.create({
  baseURL: "http://localhost:9001/engine-rest",
  headers: { "Content-Type": "application/json" }
});

readlineSync.question("启动一个流程实例。\nPress Return to continue...");

// 启动 process instance，并指定执行人：“张三”
rest
  .post("/message", {
    messageName: "startMessage",
    processVariables: {
      assignee: {
        value: {
          user: "张三",
          group: ["第一组", "第二组"]
        }
      }
    },
    resultEnabled: true
  })
  .then(
    res => {
      const processInstanceId = res.data[0].processInstance.id;
      console.log(
        "创建流程实例成功。\nProcess Instance ID: ",
        processInstanceId
      );

      readlineSync.question(
        "重新指定执行人和候选组。\nPress Return to continue..."
      );
      return rest.post("/message", {
        messageName: "reassignee",
        processInstanceId,
        processVariables: {
          assignee: {
            value: {
              user: "李四",
              group: "第三组"
            }
          }
        },
        resultEnabled: true
      });
    },
    err => {
      console.log("创建失败。\nError Message: ", err.response.data);
    }
  )
  .then(
    res => {
      console.log("重新指定成功。");
    },
    err => {
      console.log("重新指定失败。\nError Message: ", err.response.data);
    }
  );
