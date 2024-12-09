import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/storiesModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { country } = req.query;

  try {
    const filter = country 
      ? { country: { $regex: new RegExp(`^${country}$`, 'i') } } 
      : {};
    
    const allStories = await Story.find(filter);

    res
      .status(200)
      .json({ message: "Data fetched successfully", stories: allStories });
  } catch (error) {
    console.error("Get stories error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}