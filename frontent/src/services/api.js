import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-backend-8esp.onrender.com"
});

export default API;