import { models, model } from "mongoose";
import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    story: {type: String, required: true},
    country: {type: String, required: true},
})

const Story = models.Story || model("Story", storySchema)

export default Story;