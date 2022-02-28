import axios from "axios";

const baseURL = "http://192.168.56.1:4000/api/v1/";

const instance = axios.create({
  baseURL: `${baseURL}`,
});

export default instance;
