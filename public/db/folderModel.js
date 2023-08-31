const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, "Please provide a filename"],
        unique: false,
    },

    path: {
        type: String,
        required: [false, "Please provide a path!"],
        unique: false,
    },
    parent_path: {
        type: String,
        required: [false, "Please provide a path!"],
        unique: false,
    },
    profile_id: {
        type: String,
        required: [false, "Please provide a uid"]
    }

})

const Folder = mongoose.model.Folders || mongoose.model("Folders", FolderSchema);
module.exports =  Folder;