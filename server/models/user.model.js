const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    model: {
        type: String,
        default: "User"
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        maxlength: 200,
    },
    image: {
        type: String,
        default: "../images/default-profile.png"
    },
    role: {
        type: String,
        enum: ["ADMIN", "AUTHOR", "READER"]
    },
    favProjects: {
        type: [Schema.Types.ObjectId],
        ref: "Project"
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User