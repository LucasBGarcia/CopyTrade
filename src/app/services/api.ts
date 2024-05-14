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
  baseURL: "https://049f-181-220-100-11.ngrok-free.app",
});

export default api;