import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/Add';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

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

export default function MUIEditPlaylistModal() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [ playlistName, setPlaylistName ] = useState(store.currentList.name)
    const [ playlistNameExists, setPlaylistNameExists ] = useState(false);
    const [ isPlaylistNameClicked, setIsPlaylistNameClicked ] = useState(false);
    
    function handleUpdateListName(event) {
        setPlaylistName(event.target.value);
        setPlaylistNameExists(false);
        const playlists = store.idNamePairs;
        for (const list of playlists) {
            if (list._id !== store.currentList._id) {
                if (list.name.trim().toLowerCase() === event.target.value.trim().toLowerCase()) {
                    setPlaylistNameExists(true);
                    break;
                }
            }
        }
    }
 
    const handleClearPlaylistName = () => {
        setPlaylistName("");
        setIsPlaylistNameClicked(false);
        setPlaylistNameExists(false);
    }

    const handlePlaylistNameClicked = () => {
        setIsPlaylistNameClicked(true);
    }
    
    const handleClickAddSong = () => {
        history.push("/songscatalog/")
    }

    function handleCloseModal(event) {
        store.changeListName(store.currentList._id, playlistName);
        store.hideModals();
    }
    
    function handleDragStart(event, index) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
    }

    function handleDragLeave(event) {
        event.preventDefault();
    }

    function handleDrop(event, index) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }

    function handleCopySong(song, index) {
        const newSong = { title: song.title + " (Copy)", artist: song.artist, year: song.year, youTubeId: song.youTubeId};
        store.addCreateSongTransaction(store.currentList.songs.length, newSong.title, newSong.artist, newSong.year, newSong.youTubeId);
    }

    function handleRemoveSong(song, index) {
        store.addRemoveSongTransaction(song, index);
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    return (
        <Modal
        open={store.currentModal === "EDIT_PLAYLIST"}
        aria-labelledby="edit-playlist-modal-title"
        aria-describedby="edit-playlist-modal-description"
        >
        <Box sx={style1}>
            <Box sx={{ backgroundColor:'#127036', padding: '10px 5px', borderBottom: '3px solid black'}}>
                <Typography sx={{fontWeight: 'bold', color: 'white', fontSize: 20}} id="delete-modal-title" variant="h4" component="h2">
                    Edit Playlist
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8DF2A9', flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ gap: 4}}>
                    <TextField
                        fullWidth
                        name="playlistName"
                        id="playlistName"
                        variant="standard"
                        value={playlistName}
                        onChange={handleUpdateListName}
                        onFocus={handlePlaylistNameClicked}
                        error={playlistNameExists }
                        helperText={playlistNameExists && "Playlist name already exists."} 
                        InputLabelProps={{
                            style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                        }}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearPlaylistName} sx={{ top: "-5px" }} >
                                        <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                    </IconButton>
                                </InputAdornment>
                        }}
                        inputProps={{
                            style: { paddingLeft: "10px", fontWeight: 'bold', fontSize: 30}
                        }}
                        sx= {{
                            backgroundColor: "#EAD9FA",
                            width: 700,
                        }}
                    />
                    <Button
                        variant='contained'
                        onClick={handleClickAddSong}
                        sx={{
                            mt: 0, 
                            backgroundColor: '#583A8C',
                            textTransform: 'none',
                            borderRadius: '30px',
                            width: '90px',
                            height: '45px',
                            ml: 6,
                            fontSize: 15,
                            '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                        }}
                    >
                        <AddIcon />
                        <MusicNoteIcon />
                    </Button>
                </Box>
                <Box sx={{ mt: 3, bgcolor: 'white', overflow: 'scroll', p: 1, borderRadius: 2, height: 340 }}>
                    {
                        store.currentList.songs.map((song, index) => (
                            <Box 
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                onDragStart={(event) => handleDragStart(event, index)}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={(event) => handleDrop(event, index)}
                                draggable="true"
                                sx={{
                                    bgcolor: '#FAF8A2',
                                    p: 1,
                                    borderRadius: 2,
                                    mb: 1,
                                    height: 35,
                                    border: '1px solid black',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {index + 1}. {song.title} by {song.artist} ({song.year})
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <IconButton sx={{ color: 'black' }} onClick={() => handleCopySong(song, index)}>
                                        <ContentCopyIcon style={{fontSize:'30pt'}}/>
                                    </IconButton>
                                    <IconButton sx={{ color: 'black' }} onClick={() => handleRemoveSong(song, index)}>
                                        <ClearIcon style={{fontSize:'30pt'}}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                    <Box >
                        <Button 
                            sx={{ 
                                color: "white", 
                                backgroundColor: '#583A8C', 
                                borderRadius: 5, 
                                width: 100, 
                                height: 40, 
                                fontSize: 13, 
                                textTransform: 'none', 
                                p:"5px",
                                ml: 0 ,
                                '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                            }} 
                            variant="contained"
                            disabled={!store.canUndo()}
                            id='undo-button'
                            onClick={handleUndo}
                            startIcon={<UndoIcon />}
                        > 
                            Undo 
                        </Button>
                        <Button 
                            sx={{ 
                                color: "white", 
                                backgroundColor: '#583A8C', 
                                borderRadius: 5, 
                                width: 100, 
                                height: 40, 
                                fontSize: 13, 
                                textTransform: 'none',
                                p:"5px", 
                                ml: 2, 
                                '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                            }} 
                            variant="contained"
                            disabled={!store.canRedo()}
                            id='redo-button'
                            onClick={handleRedo}
                            startIcon={<RedoIcon />}
                        > 
                            Redo 
                        </Button>
                    </Box>
                    <Button sx={{ color: "white", backgroundColor: '#127036', borderRadius: "7px", width: 100, height: 40, fontSize: 13, borderRadius: 5, ml: 15, textTransform: 'none', p:"5px", '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }}} variant="contained" onClick={handleCloseModal}> Close </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
    );
}