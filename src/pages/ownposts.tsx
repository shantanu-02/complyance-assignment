import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SkeletonScreen from "@/components/SkeletonScreen";
import CountrySelect from "@/components/CountrySelect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import ProfileModal from "@/components/ProfileModal";

interface Story {
  _id: string;
  username: string;
  title: string;
  story: string;
  country: string;
}

const Posts = () => {
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState<{ title: string; story: string }>({
    title: "",
    story: "",
  });
  const [updateStoryModal, setUpdateStoryModal] = useState<boolean>(false);
  const [editCountryModal, setEditCountryModal] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const storyModal = useSelector((state: RootState) => state.modal.storyModal);

  const handleEdit = (story: Story): void => {
    setEditStory(story);
    setUpdateStoryModal(true);
    setFormData({ title: story.title, story: story.story });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/stories/${id}`);
      setStories(stories.filter((story) => story._id !== id));
      alert("Story deleted successfully");
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete story");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (editStory) {
      try {
        const response = await axios.put(`/api/stories/${editStory._id}`, {
          title: formData.title,
          story: formData.story,
        });
        const updatedStory: Story = response.data.updatedStory;

        setStories(
          stories.map((story) =>
            story._id === editStory._id ? updatedStory : story
          )
        );
        setEditStory(null);
        setUpdateStoryModal(false);
        setFormData({ title: "", story: "" });
        alert("Story updated successfully");
      } catch (error) {
        console.error("Error updating story:", error);
        alert("Failed to update story");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    const fetchStories = async () => {
      try {
        const userCountry = localStorage.getItem("userCountry");
        const url = userCountry
          ? `/api/${user?.username}/fetch`
          : `/api/stories/fetch/`;

        const response = await axios.get(url);
        const allStories: Story[] = response.data.stories;

        setStories(allStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [storyModal, country, router, user]);

  return (
    <div>
      <ProfileModal />
      <Navbar />
      <div className="grid grid-cols-4 gap-8 p-8 mt-10">
        {loading ? (
          <SkeletonScreen />
        ) : stories.length > 0 ? (
          stories.map((story, index) => (
            <div
              key={index}
              className="h-60 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {story?.username}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{story?.country}</p>
                    {user?.role === "admin" && (
                      <button
                        title="editStory"
                        onClick={() => {
                          setEditCountryModal(true);
                          setEditStory(story);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </div>
                {user?.username === story?.username && (
                  <div className="flex gap-1">
                    <button
                      className="text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 rounded-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-200"
                      onClick={() => handleEdit(story)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-md hover:from-red-600 hover:to-red-800 transition-colors duration-200"
                      onClick={() => handleDelete(story._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold text-gray-900">
                {story?.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {story?.story}
              </p>
            </div>
          ))
        ) : (
          <div className="h-60">No stories found...</div>
        )}

        {updateStoryModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                <span className="bg-blue-700 text-transparent bg-clip-text">
                  {editStory?.username}
                </span>
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring focus:ring-blue-300 outline-none shadow-sm"
                  required
                />
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  placeholder="Story"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring focus:ring-blue-300 outline-none shadow-sm"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-700 to-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-150"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpdateStoryModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editCountryModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Edit Country for{" "}
                <span className="text-blue-600">{editStory?.title}</span>
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await axios.put(
                      `/api/stories/${editStory?._id}/update-country`,
                      {
                        country,
                      }
                    );
                    const updatedStory: Story = response.data.updatedStory;

                    setStories(
                      stories.map((story) =>
                        story._id === updatedStory._id ? updatedStory : story
                      )
                    );

                    setEditCountryModal(false);
                    setCountry("");
                    setEditStory(null);
                    alert("Country updated successfully");
                  } catch (error) {
                    console.error("Error updating country:", error);
                    alert("Failed to update country");
                  }
                }}
              >
                <CountrySelect
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label=""
                />

                <div className="flex justify-end space-x-4 mt-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-700 to-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-150"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCountryModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Posts;
