const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    model: {
        type: String,
        default: "Project"
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        enum: ["Fantasy", "Horror", "Science-Fiction", "Space Opera", "Romance", "Adventure", "Erotic", "FanFiction", "Historical", "Mistery", "Religious/Spiritual", "Satire/Humour", "Thriller/Suspense", "Others (Tell us more in the synopsis)"],
        required: true,
    },
    tagLines: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        enum: ["World-Building", "Novel", "Tabletop RPG", "Video Game Script", "Comic Script", "Movie/Series Script", "Short-Stories"],
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,
    }, 
    timeline: {
        type: [String]
    }

}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project