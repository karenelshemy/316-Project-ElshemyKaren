import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Grid from '@mui/material/Grid';

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

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [songYear, setSongYear] = useState("");
    const [songYouTubeId, setSongYouTubeId] = useState("");

    useEffect(() => {
        if (store.currentSong) {
            setSongTitle(store.currentSong.title);
            setSongArtist(store.currentSong.artist);
            setSongYear(store.currentSong.year);
            setSongYouTubeId(store.currentSong.youTubeId);
        }
        }, [store.currentSong]);
    
    function handleCloseModal(event) {
        store.hideModals();
    }
    
    function handleSongTitle(event) {
        setSongTitle(event.target.value);
    }

    const handleClearSongTitle = () => {
        setSongTitle("");
    }

    function handleSongArtist(event) {
        setSongArtist(event.target.value);
    }

    const handleClearSongArtist = () => {
        setSongArtist("");
    }

    function handleSongYear(event) {
        setSongYear(event.target.value);
    }

    const handleClearSongYear = () => {
        setSongYear("");
    }

    function handleSongYoutTubeId(event) {
        setSongYouTubeId(event.target.value);
    }

    const handleClearSongYouTubeId = () => {
        setSongYouTubeId("");
    }

    const handleEditSong = (event, id) => {
        event.preventDefault();
        const editedSong = { title: songTitle.trim(), artist: songArtist.trim(), year: songYear, youTubeId: songYouTubeId.trim()};
        store.editSongFromCatalog(id, editedSong);
    }

    return (
        <Modal
        open={store.currentModal === "EDIT_SONG"}
        aria-labelledby="edit-song-modal-title"
        aria-describedby="edit-song-modal-description"
        >
        <Box sx={style1}>
            <Box sx={{ backgroundColor:'#127036', padding: '10px 5px', borderBottom: '3px solid black'}}>
                <Typography sx={{fontWeight: 'bold', color: 'white', fontSize: 20}} id="edit-song-modal-title" variant="h4" component="h2">
                    Edit Song
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8DF2A9', flexGrow: 1, p: 3}}>
                <Grid container spacing={6}>
                    <Grid item xs={10} sx={{ mt: 5 }}>
                        <TextField
                            fullWidth
                            name="songTitle"
                            placeholder="Title"
                            id="songTitle"
                            variant="standard"
                            value={songTitle}
                            onChange={handleSongTitle}
                            InputLabelProps={{
                                style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClearSongTitle} sx={{ top: "-5px" }} >
                                            <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            inputProps={{
                                style: { paddingLeft: "10px" }
                            }}
                            sx= {{
                                paddingTop: '9px',
                                marginLeft: 20,
                                backgroundColor: "#EAD9FA",
                                width: 500
                            }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            name="songArtist"
                            placeholder="Artist"
                            id="songArtist"
                            variant="standard"
                            value={songArtist}
                            onChange={handleSongArtist}
                            InputLabelProps={{
                                style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClearSongArtist} sx={{ top: "-5px" }} >
                                            <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            inputProps={{
                                style: { paddingLeft: "10px" }
                            }}
                            sx= {{
                                paddingTop: '9px',
                                marginLeft: 20,
                                backgroundColor: "#EAD9FA",
                                width: 500
                            }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name="songYear"
                            placeholder="Year"
                            id="songYear"
                            variant="standard"
                            value={songYear}
                            onChange={handleSongYear}
                            InputLabelProps={{
                                style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClearSongYear} sx={{ top: "-5px" }} >
                                            <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            inputProps={{
                                style: { paddingLeft: "10px" }
                            }}
                            sx= {{
                                paddingTop: '9px',
                                marginLeft: 20,
                                backgroundColor: "#EAD9FA",
                                width: 500,
                            }}
                        />
                    </Grid >
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            name="songYouTubeId"
                            placeholder="YouTube Id"
                            id="songYouTubeId"
                            variant="standard"
                            value={songYouTubeId}
                            onChange={handleSongYoutTubeId}
                            InputLabelProps={{
                                style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClearSongYouTubeId} sx={{ top: "-5px" }} >
                                            <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            inputProps={{
                                style: { paddingLeft: "10px" }
                            }}
                            sx= {{
                                paddingTop: '9px',
                                marginLeft: 20,
                                backgroundColor: "#EAD9FA",
                                width: 500
                            }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 50 }}>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 5, ml: 20 ,'&:hover': { cursor: 'pointer', backgroundColor: '#333232' }}} variant="contained" onClick={(event) => handleEditSong(event, store.currentSong._id)}> Complete </Button>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 5, ml: -25, '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }}} variant="contained" onClick={handleCloseModal}> Cancel </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
    );
}