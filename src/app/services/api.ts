// import axios from 'axios';

// const api = axios.create({
//   baseURL: "http://127.0.0.1:4040", // Substitua pelo endereço público do seu backend
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;


import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "http://18.231.10.224:3000",
});

export default api;