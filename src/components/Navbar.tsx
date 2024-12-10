import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserGear } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setProfileModal } from "@/redux/modalSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex justify-around items-center fixed top-0 left-0 right-0 z-10 bg-white shadow-md border-b">
      <div className="h-12 w-12 object-contain cursor-pointer" onClick={()=> router.push("/")}>
        <img
          src="https://46890604.fs1.hubspotusercontent-na1.net/hub/46890604/hubfs/complyance%20logo.png?width=108&amp;height=108"
          alt="Complyance Logo"
          className="rounded-full"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="h-10 flex items-center bg-gray-100 border border-gray-300 rounded-l-md px-3 cursor-pointer hover:bg-gray-200">
          <CiSearch className="text-gray-600" />
        </div>
        <input
          type="text"
          value=""
          placeholder="Search for stories"
          className="h-10 w-64 border border-gray-300 rounded-r-md px-3 outline-none"
        />
      </div>

      <div className="w-20 text-gray-700 text-sm text-center">
        {user?.country || "Guest"}
      </div>
      <div className="flex items-center cursor-pointer">
        {user && (
          <Link
            href="/ownposts"
            className="h-8 px-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white text-sm font-medium rounded-md flex items-center justify-center hover:from-orange-600 hover:to-orange-800"
          >
            Your posts
          </Link>
        )}
      </div>
      <div className="flex items-center cursor-pointer">
        {user?.role === "admin" && (
          <Link
            href="/users"
            className="h-8 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-medium rounded-md flex items-center justify-center hover:from-green-600 hover:to-green-800"
          >
            Manage Users
          </Link>
        )}
      </div>
      <div className="flex items-center cursor-pointer">
        {user ? (
          <div
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            onClick={() => dispatch(setProfileModal(true))}
          >
            <FaUserGear className="text-xl" />
            <span className="font-medium">{user?.username}</span>
          </div>
        ) : (
          <Link
            href="/login"
            className="h-8 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-medium rounded-md flex items-center justify-center hover:from-green-600 hover:to-green-800"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
