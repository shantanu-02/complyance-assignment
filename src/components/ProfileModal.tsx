import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setProfileModal } from "@/redux/modalSlice";
import Logout from "@/pages/logout";

const ProfileModal = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const profileModal = useSelector((state: RootState) => state.modal.profileModal);

  const dispatch = useDispatch();

  return (
    profileModal && (
      <div className="fixed top-10 right-10 w-96 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl shadow-xl text-white z-50 animate-fade-in-down">
        <div className="relative flex justify-end p-4">
          <IoCloseCircle
            onClick={() => dispatch(setProfileModal(false))}
            size={30}
            className="text-gray-300 hover:text-white cursor-pointer transition-transform transform hover:scale-110"
          />
        </div>
        <div className="flex flex-col items-center p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-md">
            <FaCircleUser size={60} className="text-white" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{user?.username || "Guest"}</h1>
            <p className="text-2xl text-gray-400">{user?.country || "Unknown Location"}</p>
            <p className="text-xl font-medium bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              {user?.role || "User"}
            </p>
          </div>
          <div className="w-full flex flex-col items-center space-y-3">
            <Logout />
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
