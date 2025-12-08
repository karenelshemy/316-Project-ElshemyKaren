const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const auth = require('../auth')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author Karen Elshemy
*/
createPlaylist = (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    
    const playlist = new Playlist(body);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            const user = await User.findOne({ email: list.ownerEmail});
            console.log("user._id: " + user._id);
            console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {
                console.log("correct user!");
                try {
                    await Playlist.findOneAndDelete({ _id: req.params.id })
                    user.playlists = user.playlists.filter((id) => id.toString() !== list._id.toString());
                    await user.save();
                    return res.status(200).json({});
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log("incorrect user!");
                return res.status(400).json({ 
                    errorMessage: "authentication error" 
                });
            }
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

getPlaylistPairs = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("getPlaylistPairs");

    try {
        const user = await User.findOne({ _id: req.userId });
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            try {
                const playlists = await Playlist.find({ ownerEmail: email })
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                } else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let user = await User.findOne({ email: list.ownerEmail });
                        let pair = {
                            _id: list._id,
                            name: list.name,
                            userName: user.userName
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            } catch(err) {
                console.log(err)
                return res.status(400).json({ success: false, error: err })
            }
        }  
        asyncFindList(user.email);
    } catch (err) {
        console.log(err);
    }
}

getPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.name);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // DOES THIS LIST BELONG TO THIS USER?
    try { 
        const playlist = await Playlist.findOne({ _id: req.params.id });
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist not found!',
            })
        }
        console.log("playlist found: " + JSON.stringify(playlist));

        const user = await User.findOne({ email: playlist.ownerEmail });
        console.log("user._id: " + user._id);
        console.log("req.userId: " + req.userId);
        if (user._id.toString() !== req.userId.toString()) {
            console.log("incorrect user!");
            return res.status(400).json({ success: false, description: "authentication error" });
        }
        if (user._id.toString() === req.userId.toString()) {
            console.log("correct user!");
            console.log("req.body.name: " + req.body.name);
        }

        const playlists = await Playlist.find({ ownerEmail: user.email, name: {$regex: '^' + body.playlist.name.trim(), $options: 'i'} });
        for (const list of playlists) {
            if (list._id.toString() !== req.params.id.toString()) {
                return res.status(400).json({ 
                    success: false,
                    errorMessage: "Playlist name already exists." 
                })
            }
        }

        playlist.name = body.playlist.name;
        playlist.songs = body.playlist.songs;
        playlist
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Playlist updated!',
                })
            })
        } catch (error) {
            console.log("FAILURE: " + JSON.stringify(error));
            return res.status(404).json({
                error,
                message: 'Playlist not updated!'
        });
    }
}

queryPlaylists = async (req, res) => {
    const query = req.query;

    if (!query) {
        return res.status(400).json({
            success: false,
            error: 'You must provide something to search.'
        })
    }
    try {
        let playlists = await Playlist.find({});
        let filteredPlaylists = [];

        for (let playlist of playlists) {
            let meetsCriteria = true;
            
            if (query.name) {
                if (!playlist.name.trim().toLowerCase().includes(query.name.trim().toLowerCase())) {
                    meetsCriteria = false;
                }
            }
            if (query.owner) {
                if (!playlist.ownerEmail.trim().toLowerCase().includes(query.owner.trim().toLowerCase())) {
                    meetsCriteria = false;
                }
            }
            if (query.title || query.artist || query.year) {
                let doesSongMeet = false;
                for (let song of playlist.songs) {
                    let songMeetsCriteria = true;
                    if (query.title && song.title.trim().toLowerCase() !== query.title.trim().toLowerCase()) {
                        songMeetsCriteria = false;
                    }
                    if (query.artist && song.artist.trim().toLowerCase() !== query.artist.trim().toLowerCase()) {
                        songMeetsCriteria = false;
                    }
                    if (query.year && song.year.toString() !== query.year.toString()) {
                        songMeetsCriteria = false;
                    }
                    if (songMeetsCriteria === true) {
                        doesSongMeet = true;
                        break;
                    }
                }
                if (doesSongMeet === false) {
                    meetsCriteria = false;
                }
            }
            
            if (meetsCriteria === true) {
                filteredPlaylists.push(playlist);
            }
        }

        let pairs = [];
        for (let key in filteredPlaylists) {
            let list = filteredPlaylists[key];
            let user = await User.findOne({ email: list.ownerEmail });
            let pair = {
                _id: list._id,
                name: list.name,
                userName: user.userName
            };
            pairs.push(pair)
        }

        if (filteredPlaylists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No playlists meet the given criteria!"
            })
        } else {
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    updatePlaylist,
    queryPlaylists
}