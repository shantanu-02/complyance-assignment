import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Story from "@/models/storiesModel";
import { error } from "console";

export default async function handler (req: NextApiRequest, res:NextApiResponse){
    await dbConnect();

    const {username, title, story, country} = req.body;

    if (!username || !title || !story || !country) {
        res.status(400).json({error:"All fields are necessary"})
    }

    try {
        const newStory = await Story.create({
            username,
            title,
            story,
            country
        })

        res.status(200).json({message: "New story added successfully", newStory})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}