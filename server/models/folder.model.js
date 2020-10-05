const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
    model: {
        type: String,
        default: "Folder"
    },
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    folders: {
        type: [Schema.Types.ObjectId],
        ref: "Folder",
    },
    archives: {
        type: [Schema.Types.ObjectId],
        ref: "Archive",
    },
    isPublic: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Folder = mongoose.model('Folder', folderSchema)
module.exports = Folder