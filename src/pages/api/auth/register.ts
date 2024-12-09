import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"; 
import dbConnect from "@/lib/mongodb";
import User from "@/models/usersModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password, country, role } = req.body;

  if (!username || !password || !country || !role) {
    return res.status(400).json({ error: "All field are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        country,
        role
    })

    res.status(200).json({message: "User created succesfully", user})
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"})
  }
}
