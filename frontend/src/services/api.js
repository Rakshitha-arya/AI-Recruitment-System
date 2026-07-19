import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-recruitment-system-2u7o.onrender.com/api",
});

export default api;
