const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author Karen Elshemy
*/
const songSchema = new Schema(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        year: { type : Number, required: true }, 
        youTubeId: { type: String },
        users: { type: [String], required: true },
        playlists : { type: Number, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Songs', songSchema)