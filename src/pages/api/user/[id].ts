import dbConnect from "@/lib/mongodb";
import User from "@/models/usersModel";
import Story from "@/models/storiesModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (req.method === "PUT") {
    const { country, username } = req.body;

    if (!country || typeof country !== "string") {
      return res.status(400).json({ message: "Invalid country value" });
    }

    try {
      const userId = new mongoose.Types.ObjectId(id);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { country },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await Story.updateMany({ username }, { $set: { country } });

      res
        .status(200)
        .json({ message: "Country updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user country:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const userId = new mongoose.Types.ObjectId(id);

      await Story.deleteMany({ userId });

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User and their stories deleted successfully" });
    } catch (error) {
      console.error("Error deleting user and stories:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
