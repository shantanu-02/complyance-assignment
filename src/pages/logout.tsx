import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { setProfileModal } from "@/redux/modalSlice";
import { useRouter } from "next/router";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setProfileModal(false))
    localStorage.removeItem("authToken");
    dispatch(logout());
    router.push("/")
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2 text-white text-sm font-medium bg-gradient-to-r from-red-500 to-red-700 rounded-md hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default Logout;
