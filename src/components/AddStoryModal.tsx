import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setStoryModal } from "@/redux/modalSlice";
import axios from "axios";

const AddStoryModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const storyModal = useSelector((state: RootState) => state.modal.storyModal);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    title: "",
    story: "",
    country: user?.country || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/stories/story", formData);
      setMessage(response.data.message);
      dispatch(setStoryModal(false));
      setFormData({ ...formData, title: "", story: "" });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleClose = () => {
    dispatch(setStoryModal(false))
    setFormData({ ...formData, title: "", story: "" });
  }

  useEffect(()=> {
    setFormData((prevData) => ({
      ...prevData,
      username: user?.username || "",
      title: "",
      story: "",
      country: user?.country || "",
    }))    
  }, [user])

  useEffect(()=>{
    setMessage("")
  }, [storyModal])

  return (
    storyModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={handleClose}
          >
            ✖
          </button>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Share Your Story
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Give your story a title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
            />
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              required
              placeholder="Tell us about your story"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:ring focus:ring-blue-300 outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg px-4 py-2 hover:from-blue-600 hover:to-purple-600 focus:ring focus:ring-blue-300"
            >
              Add Story
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-red-500 font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default AddStoryModal;
