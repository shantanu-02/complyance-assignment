import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/usersModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const users = await User.find({ role: "viewer" }).select("_id username country");
    res.status(200).json({ message: "Data fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
