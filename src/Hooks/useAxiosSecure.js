// hooks/useAxiosSecure.js
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  // Request interceptor - Add token
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error("Error getting token:", error);
          await logOut();
          navigate("/login", {
            state: { from: window.location.pathname },
            replace: true,
          });
          return Promise.reject(error);
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - Handle 401 errors only
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // If 401 error, immediately log out and redirect to login
      if (error.response?.status === 401) {
        console.log("Unauthorized - Logging out immediately");

        await logOut();
        navigate("/login", {
          state: {
            from: window.location.pathname,
            message: "Your session has expired. Please log in again.",
          },
          replace: true,
        });
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default useAxiosSecure;
