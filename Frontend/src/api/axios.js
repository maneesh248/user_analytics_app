import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api",
  // You can add default headers here if needed
});

export default api;
