import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setStoryModal } from "@/redux/modalSlice";

const AddStoryButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="h-60 bg-gray-200 p-4 flex flex-col justify-center items-center hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer rounded-lg"
      onClick={() => {
        dispatch(setStoryModal(true));
      }}
    >
      <div className="mb-4">
        <IoMdAdd size={50} className="text-gray-600" />
      </div>
      <h5 className="text-gray-700 text-lg">Add your story...</h5>
    </div>
  );
};

export default AddStoryButton;
