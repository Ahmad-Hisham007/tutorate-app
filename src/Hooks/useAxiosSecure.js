// hooks/useAxiosSecure.js
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  // Request interceptor - Add token
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - Handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("Unauthorized - redirect to login");
        // Handle logout/redirect here
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default useAxiosSecure;
