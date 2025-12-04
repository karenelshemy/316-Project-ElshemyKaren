const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String },
        playlists: [{type: ObjectId, ref: 'Playlist'}],
        avatar: { type: String }
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)