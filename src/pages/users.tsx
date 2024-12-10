import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import { RootState } from "@/redux/store";
import Navbar from "@/components/Navbar";
import ProfileModal from "@/components/ProfileModal";
import CountrySelect from "@/components/CountrySelect";
import { User } from "@/types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{ country: string }>({
    country: "",
  });

  const User = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (User?.role !== "admin") {
      router.push("/");
    } else {
      const fetchUsers = async () => {
        try {
          const response = await axios.get<{ users: User[] }>(
            "/api/user/users"
          );
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
          alert("Failed to fetch users");
        }
      };
      fetchUsers();
    }
  }, [User, router]);

  const handleEdit = (user: User): void => {
    setEditUser(user);
    setFormData({ country: user.country });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (editUser) {
      try {
        const response = await axios.put(`/api/user/${editUser._id}`, {
          country: formData.country,
          username: editUser.username,
        });
        const updatedUser: User = response.data.user;

        setUsers(
          users.map((user) => (user._id === editUser._id ? updatedUser : user))
        );
        setEditUser(null);
        setFormData({ country: "" });
        alert("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      <Navbar />
      <ProfileModal />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 m-t">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          User Management
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="border px-6 py-3 text-left">Username</th>
                <th className="border px-6 py-3 text-left">Country</th>
                <th className="border px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-6 py-3">{user.username}</td>
                  <td className="border px-6 py-3">{user.country}</td>
                  <td className="border px-6 py-3 text-center space-x-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:text-blue-700 transition duration-150"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition duration-150"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                <span className="bg-blue-700 text-transparent bg-clip-text">
                  {editUser.username}
                </span>
              </h2>
              <form onSubmit={handleSubmit}>
                <CountrySelect
                  name="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  label="Update country"
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
                    onClick={() => setEditUser(null)}
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
    </div>
  );
};

export default Users;
