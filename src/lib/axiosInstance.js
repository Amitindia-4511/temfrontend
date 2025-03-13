import axios from "axios";
import { server } from "../constants/config";

console.log(server);
const axiosInstance = axios.create({
  baseURL: "https://projecthammbackend.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
