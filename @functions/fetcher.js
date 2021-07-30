const axios = require("axios");

exports.axios = async function Axios(url, method) {
  console.table([{url, method}]);
  let txt = {
    status: 400,
    message: !url ? "No Url Params" : "No Method Params"
  };
  if (!url || !method) return txt;
  try {
    const response = await axios(url, {
      method: method
    });
    console.log("Success Scrape the Data", {
      status: response.status
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

exports.getBuffer = async function buffer(url, options) {
  try {
    options ? options : {};
    const response = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};