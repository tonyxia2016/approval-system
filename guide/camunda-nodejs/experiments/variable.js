const axios = require("axios");

(async () => {
  const startProcess = axios.create({
    baseURL: "http://localhost:9001/engine-rest",
    headers: { "Content-Type": "application/json" }
  });

  startProcess
    .post("/process-definition/key/variable-experiment/start", {
      variables: {
        address: {
          type: "Json",
          value: JSON.stringify({ country: "China", city: "北京" })
        },
        address2: {
          value: {
            country: "China",
            city: "武汉"
          }
        },
        address3: {
          type: "Json",
          value: JSON.stringify({ data: ["China", "武汉"] })
        },
        address4: {
          value: ["China", "武汉"]
        }
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
})();
