const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });
const testData = require("../db-data.json")
const Playlist = require('../../../models/playlist-model')
const User = require("../../../models/user-model")

async function clearCollection(collection, collectionName) {
    try {
        await collection.deleteMany({});
        console.log(collectionName + " cleared");
    }
    catch (err) {
        console.log(err);
    }
}

async function fillCollection(collection, collectionName, data) {
    if (collectionName == "User") {
        for (let i = 0; i < data.users.length; i++) {
            let doc = data.users[i];
            const user = new collection({
                userName: doc.name,
                email: doc.email,
                playlists:[]
            });
            await user.save();

            for (const list of data.playlists) {
                if (list.ownerEmail == user.email) {
                    const playlist = new Playlist({
                        name: list.name,
                        songs: list.songs,
                        ownerEmail: list.ownerEmail
                    });
                    await playlist.save();
                    user.playlists.push(playlist._id);
                }
            await user.save();
            }
        }
    } else if (collectionName == "Playlist") {
        for (let i = 0; i < data.playlists.length; i++) {
            let doc = new collection(data.playlists[i]);
            await doc.save();
        }
    }
    console.log(collectionName + " filled");
}

async function resetMongo() {
    console.log("Resetting the Mongo DB")
    await clearCollection(Playlist, "Playlist");
    await clearCollection(User, "User");
    await fillCollection(Playlist, "Playlist", testData);
    await fillCollection(User, "User", testData);
}

const mongoose = require('mongoose')
mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => { resetMongo() })
    .catch(e => {
        console.error('Connection error', e.message)
    })
