import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://tutorate-server.vercel.app/api",
  });
  return axiosInstance;
};

export default useAxios;
