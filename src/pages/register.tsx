import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CountrySelect from "@/components/CountrySelect"; // Import the reusable component

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    country: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [spaceError, setSpaceError] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      setSpaceError(true);
    } else {
      setSpaceError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message);
      router.push("/login");
    } catch (error: any) {
      setMessage(error.response?.data.message || "Error registering user");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
        {spaceError && (
          <p className="mb-2 text-sm text-center text-red-600">
            Username cannot contain spaces.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <CountrySelect
            name="country"
            value={formData.country}
            onChange={handleChange}
            label="Country"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-150"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
