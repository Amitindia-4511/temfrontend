import axios from "axios";
import { server } from "../constants/config";

console.log(server);
const axiosInstance = axios.create({
  baseURL: "https://tempbackend-47ip.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
