import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/storiesModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { id } = req.query as { id: string };
  const { title, story } = req.body as { title?: string; story?: string };

  if (req.method == "PUT") {
    if (!title || !story) {
      res.status(400).json({ error: "All fields are mandatory" });
    }

    try {
      const updatedStory = await Story.findByIdAndUpdate(
        id,
        {
          title,
          story,
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Story updated succesfully", updatedStory });
    } catch (error) {
      console.log("Error updating story", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method == "DELETE") {
    try {
        const deletedUser = await Story.findByIdAndDelete(id)

        if(!deletedUser){
            res.status(400).json({error:"No story found"})
        }

        res.status(200).json({message: "Story deleted successfully"})
    } catch (error) {
      console.log("Error deleting story", error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ error: "Method is not allowed" });
  }
}
