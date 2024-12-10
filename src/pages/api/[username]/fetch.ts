import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/storiesModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { username } = req.query;

  try {
    
    const allStories = await Story.find({username: username});

    res
      .status(200)
      .json({ message: "Data fetched successfully", stories: allStories });
  } catch (error) {
    console.error("Get stories error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}