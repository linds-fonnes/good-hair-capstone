import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class GoodHairApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.log("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${GoodHairApi.token}`,
    };

    const params = method === "get" ? data : {};

    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCurrentUser(email) {
    let res = await this.request(`clients/${email}/profile`);
    return res;
  }

  static async signup(data) {
    let res = await this.request(`clients/register`, data, "post");
    return res;
  }

  static async login(data) {
    let res = await this.request(`clients/login`, data, "post");
    return res.data.token;
  }

  static async getStylists(zipcode) {
    let res = await this.request(`stylists/search?zipcode=${zipcode}`);
    return res.data;
  }

  static async getStylistProfile(email) {
    let res = await this.request(`stylists/${email}/profile`);
    console.log("RES", res);
    return res.data;
  }
}

export default GoodHairApi;
