import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class GoodHairApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GoodHairApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCurrentUser(userType, email) {
    let res;
    if (userType === "stylist") {
      res = await this.request(`stylists/${email}/profile`);
      return res;
    } else if (userType === "client") {
      res = await this.request(`clients/${email}/profile`);
      return res;
    }
  }

  static async signup(userType, data) {
    let res;
    if (userType === "stylist") {
      res = await this.request(`stylists/register`, data, "post");
    } else if (userType === "client") {
      res = await this.request(`clients/register`, data, "post");
    }

    return res;
  }

  static async login(userType, data) {
    let res;
    if (userType === "stylist") {
      res = await this.request(`stylists/login`, data, "post");
    } else if (userType === "client") {
      res = await this.request(`clients/login`, data, "post");
      console.log(userType, data, res);
    }
    return res;
  }

  static async getStylists(zipcode) {
    let res = await this.request(`stylists/search?zipcode=${zipcode}`);
    return res;
  }
}

export default GoodHairApi;
