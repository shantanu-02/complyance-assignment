import { model, models} from "mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, required: true },
});

const User = models.User || model("User", userSchema);

export default User;
