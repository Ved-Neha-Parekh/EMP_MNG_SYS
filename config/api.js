import axios from "axios";
import env from "./dotenv.js";

const api = axios.create({
  baseURL: `http://localhost:${env.PORT || 8081}/api`,
});

export default api;
