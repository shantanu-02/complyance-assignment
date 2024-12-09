import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/storiesModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PUT") {
    const { country } = req.body;

    if (!country) {
      return res.status(400).json({ error: "Country is required" });
    }

    try {
      const updatedStory = await Story.findByIdAndUpdate(id, { country }, { new: true });

      if (!updatedStory) {
        return res.status(404).json({ error: "Story not found" });
      }

      res.status(200).json({ message: "Country updated successfully", updatedStory });
    } catch (error) {
      console.error("Error updating country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
