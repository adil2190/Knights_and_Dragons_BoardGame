import axios from "axios";

const BASE_URL = "https://knightsanddanger.herokuapp.com/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default instance;
