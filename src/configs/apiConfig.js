import axios from "axios";

const BASE_URL = "http://192.168.100.9:3001/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default instance;
