const axios = require("axios");

(async () => {
  const startProcess = axios.create({
    baseURL: "http://localhost:8080/engine-rest",
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
          value: {
            data: ["China", "武汉"]
          }
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
