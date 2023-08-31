import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a filename"],
        unique: false,
    },

    path: {
        type: String,
        required: [true, "Please provide a path!"],
        unique: false,
    }
})

const File = mongoose.model.Files || mongoose.model("Files", UserSchema);
export default File;