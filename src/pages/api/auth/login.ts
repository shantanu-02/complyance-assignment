import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/usersModel";

const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method is not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Invalid credentialas" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json({ error: "User dosn't exist" });
    }

    const isPasswordCorect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorect) {
      res.status(401).json({ error: "Inavlid password" });
    }

    const token = jwt.sign({ userID: existingUser._id }, JWT_SECRET_KEY);
    res.status(200).json({ message: "User logged in successfully", 
      user: {
        username: existingUser.username,
        role: existingUser.role,
        country: existingUser.country,
      }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
