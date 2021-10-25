const axios = require("axios");
const { API_KEY } = require("../config");

async function zipcodeRadius(zipcode) {
  try {
    const zipcodes = await axios.get(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipcode}&maximumradius=500&minimumradius=0&country=ALL&key=${API_KEY}`
    );
    let radius = [];
    for (const data of zipcodes.data.DataList) {
      radius.push(data.Code);
    }
    return radius;
  } catch (e) {
    return e;
  }
}

module.exports = zipcodeRadius;
