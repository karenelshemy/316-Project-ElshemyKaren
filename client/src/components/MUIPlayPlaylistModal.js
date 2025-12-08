import { useContext, useEffect, useState, useRef } from 'react'
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 600,
    backgroundColor: '#669966',
    justifyContent: 'center',
    border: '3px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column'
};

export default function MUIPlayPlaylistModal() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ songPlaying, setSongPlaying ] = useState(false);
    const [ repeatPlaylist, setRepeatPlaylist ] = useState(false);
    const playlist = [];
    for (const song of store.currentList.songs) {
        playlist.push(song.youTubeId);
    }
    const currentSong = useRef(0);
    const player = useRef(null);

    useEffect(() => {
        // Loads the IFrame Player API code asynchronously.
        if (!window.YT) {
            let tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Creates an <iframe> (and YouTube player) after the API code downloads.
        function onYouTubeIframeAPIReady() {
            currentSong.current = 0;
            if (!player.current) {
                player.current = new window.YT.Player('youtube_test_player', {
                    height: '390',
                    width: '640',
                    videoId: playlist[currentSong.current],
                    useLocalHTML: true,
                    playerVars: {
                    'playsinline': 1
                    },
                    events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                    }
                });
            }
        }

        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        const interval = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(interval);
                onYouTubeIframeAPIReady();
            }
        })
    }, []);

    function changeSong() {
        if (currentSong.current >= 0) {
            player.current.loadVideoById(playlist[currentSong.current]);
        // player.playVideo();
        }
    }

    function incSong() {
        currentSong.current++;
        if (currentSong.current >= playlist.length) {
            if (repeatPlaylist) {
                currentSong.current = 0
            } else {
                currentSong.current = 0
            }
        };
    }

    function decSong() {
        currentSong.current--;
        if (currentSong.current < 0) {
            if (repeatPlaylist) {
                currentSong.current = playlist.length - 1;
            } else {
                currentSong.current = playlist.length - 1;
            }
        }
    }
    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    let done = false;
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            incSong();
            changeSong();
        } else if (playerStatus === 1) {
            setSongPlaying(true);
        } else if (playerStatus === 2) {
            setSongPlaying(false);
        }
    }
    
    function playPause() {
        if (player.current.getPlayerState() === 1) {
            pauseVideo();
            setSongPlaying(false);
        } else if (player.current.getPlayerState() === 2) {
            playVideo();
            setSongPlaying(true);
        }
    }

    function playVideo() {
        player.current.playVideo();
    }

    function pauseVideo() {
        player.current.pauseVideo();
    }

    function handleCloseModal(event) {
        store.hideModals();
    }

    function handleRepeat(event) {
        setRepeatPlaylist(event.target.checked);
    }
    
    return (
        <Modal
        open={store.currentModal === "PLAY_LIST"}
        aria-labelledby="play-playlist-modal-title"
        aria-describedby="play-playlist-modal-description"
        >
        <Box sx={style1}>
            <Box sx={{ backgroundColor:'#127036', padding: '10px 5px', borderBottom: '3px solid black'}}>
                <Typography sx={{fontWeight: 'bold', color: 'white', fontSize: 20}} id="delete-modal-title" variant="h4" component="h2">
                    Play Playlist
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8DF2A9', flexGrow: 1, p: 1, display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ width: 500, bgcolor: 'white', overflow: 'scroll', p: 1, borderRadius: 2, height: 500 }}>
                    <Box sx={{ display: 'flex', p: 1}}>
                        <Avatar alt={auth.user.userName} src={auth.user.avatar} 
                            sx={{ width: 40, height: 40 }}
                        />
                            <Box sx={{ p: 1, flexDirection: 'column', width: 200 }} >
                                <Typography sx={{ fontSize: 13, fontWeight: 'bold', position: 'relative', top: -10 }}>
                                    {store.currentList.name}
                                </Typography>
                                <Typography sx={{ fontSize: 10, mt: -1 }}>
                                    {auth.user.userName}
                                </Typography>
                            </Box>
                        </Box>
                        {
                        store.currentList.songs.map((song, index) => (
                            <Box 
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                sx={{
                                    bgcolor: index === currentSong.current ? '#F5EB2A' : '#FAF8A2',
                                    p: 1,
                                    borderRadius: 2,
                                    mb: 1,
                                    height: 35,
                                    border: '1px solid black',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    '&:hover': { cursor: 'pointer', backgroundColor: '#EDE661' }
                                }}
                                onClick={() => {
                                    currentSong.current = index;
                                    changeSong();
                                }}
                            >
                                <Typography sx={{ textShadow: index === currentSong.current ? '1px 1px 1px red' : 'none', fontWeight: 'bold' }}>
                                    {index + 1}. {song.title} by {song.artist} ({song.year})
                                </Typography>
                            </Box>    
                        ))
                    }
                </Box>
                <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div id="youtube_test_player" style={{ width: 350, height: 200}}></div>
                    <Box sx={{ backgroundColor: '#9E9998', width: 150, height: 50, border: '1px solid black', ml: 13 }}>
                        <IconButton onClick={playPause}>
                            {songPlaying ? (<PauseIcon style={{ fontSize: '25pt', color: 'black' }} />) : (<PlayArrowIcon style={{fontSize: '25pt', color: 'black'}} />)}
                        </IconButton>
                        <IconButton 
                            onClick={() => {
                                decSong();
                                changeSong();
                            }}
                        >
                            <SkipPreviousIcon style={{ fontSize: '25pt', color: 'black' }} />
                        </IconButton>
                        <IconButton 
                            onClick={() => {
                                incSong();
                                changeSong();
                            }}
                        >
                            <SkipNextIcon style={{ fontSize: '25pt', color: 'black' }} />
                        </IconButton>
                    </Box>
                    <FormControlLabel sx={{ mt: 26 }} control={<Checkbox />} checked={repeatPlaylist} onChange={handleRepeat} label="Repeat" />
                    <Button sx={{ color: "white", backgroundColor: '#127036', borderRadius: "7px", width: 100, height: 40, fontSize: 13, borderRadius: 5, ml: 30, mt: -7, textTransform: 'none', p:"5px", '&:hover': { cursor: 'pointer', backgroundColor: '#255941' }}} variant="contained" onClick={handleCloseModal}> Close </Button>
                </Box>
            </Box>
        </Box> 
    </Modal>
    );
}