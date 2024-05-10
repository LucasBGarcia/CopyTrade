import axios from "axios";

const api = axios.create({
  baseURL: "https://bottrade-git-develop-lucasbgarcias-projects.vercel.app/api",
});

export default api;