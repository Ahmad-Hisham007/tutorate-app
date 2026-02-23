// hooks/useRole.js
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch user profile to get role
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/profile?email=${user?.email}`,
      );
      return response.data.data;
    },
    enabled: !!user?.email, // Only run if user exists
  });

  const role = profile?.role || null;

  const isStudent = role === "student";
  const isTutor = role === "tutor";
  const isAdmin = role === "admin";

  // Helper to check if user has any of the allowed roles
  const hasAnyRole = (allowedRoles) => {
    return allowedRoles.includes(role);
  };

  return {
    role,
    isStudent,
    isTutor,
    isAdmin,
    hasAnyRole,
    isLoading, // Important for loading states!
  };
};

export default useRole;
