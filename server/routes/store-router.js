/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author Karen Elshemy
*/
const express = require('express')
const StoreController = require('../controllers/store-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, StoreController.createPlaylist)
router.post('/song', auth.verify, StoreController.createSong)
router.delete('/playlist/:id', auth.verify, StoreController.deletePlaylist)
router.get('/playlist/:id', auth.verify, StoreController.getPlaylistById)
router.get('/song/:id', auth.verify, StoreController.getSongById)
router.get('/playlistpairs', auth.verify, StoreController.getPlaylistPairs)
router.get('/playlists', auth.verify, StoreController.getPlaylists)
router.put('/playlist/:id', auth.verify, StoreController.updatePlaylist)
router.get('/playlists/query', StoreController.queryPlaylists)
router.get('/songs/query', StoreController.querySongs)

module.exports = router