import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import SongCard from './SongCard';
import MUIAddSongModal from './MUIAddSongModal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SongCatalogScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [songYear, setSongYear] = useState("");

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

    const handleSearchSongs = () => {
        if (!songTitle.trim() && !songArtist.trim() && !songYear) {
            store.clearSongs();
        }
        store.querySongs({ 
            title: songTitle.trim().toLowerCase(),
            artist: songArtist.trim().toLowerCase(),
            year: songYear.toString()
        })
    }

    function handleClear(event) {
        setSongTitle("");
        setSongArtist("");
        setSongYear("");
        store.clearSongs();
    }

    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
            handleSearchSongs();
        }
    }

    const handleAddSong = () => {
        store.showAddSongCatalogModal({ title: "", artist: "", year: "", youTubeId: "" });
    }

    let modalJSX = "";
        if (store.isAddSongCatalogModalOpen()) {
            modalJSX = <MUIAddSongModal />;
        }
    
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={6} sx={{ borderRight: '1px solid lightgray', height: '630px', marginTop: 2 }}>
                <Typography variant="h4" sx={{ color: "rgb(204, 0, 204)", fontWeight: 1000, paddingLeft: 2, marginTop: 3, fontSize: 35 }}>
                    Songs Catalog
                </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={10} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                name="songTitle"
                                placeholder="by Title"
                                id="songTitle"
                                variant="standard"
                                value={songTitle}
                                onChange={handleSongTitle}
                                onKeyDown={handleKeyPress}
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
                                    marginLeft: 2,
                                    backgroundColor: "#EAD9FA"
                                }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                name="songArtist"
                                placeholder="by Artist"
                                id="songArtist"
                                variant="standard"
                                value={songArtist}
                                onChange={handleSongArtist}
                                onKeyDown={handleKeyPress}
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
                                    marginLeft: 2,
                                    backgroundColor: "#EAD9FA"
                                }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                name="songYear"
                                placeholder="by Year"
                                id="songYear"
                                variant="standard"
                                value={songYear}
                                onChange={handleSongYear}
                                onKeyDown={handleKeyPress}
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
                                    marginLeft: 2,
                                    backgroundColor: "#EAD9FA"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleSearchSongs}
                        startIcon={<SearchIcon />}
                        sx={{
                            mt: 4, 
                            backgroundColor: '#583A8C',
                            textTransform: 'none',
                            borderRadius: '30px',
                            width: '115px',
                            height: '45px',
                            ml: 2,
                            fontSize: 15,
                            '&:hover': { cursor: 'pointer', backgroundColor: '#812AB8' }
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClear}
                        sx={{
                            mt: 4, 
                            backgroundColor: '#583A8C',
                            textTransform: 'none',
                            borderRadius: '30px',
                            width: '115px',
                            height: '45px',
                            ml: 34,
                            fontSize: 15,
                            '&:hover': { cursor: 'pointer', backgroundColor: '#812AB8' }
                        }}
                    >
                        Clear
                    </Button>
            </Grid>
            <Grid item xs={6} sx={{p: 3, display: 'flex', height: 500 }} >
                <Box sx={{ mt: 8, overflow: 'scroll' }}>
                    <List >
                        {store.songPairs.map((song) => (
                            <SongCard   
                                key={song._id}
                                song={song}
                                selected={false}
                            />
                        ))} 
                    </List>
                 </Box>
            </Grid>
            <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={(event) => { handleAddSong(event) }}
                sx={{ 
                    mt: -20,
                    backgroundColor: '#583A8C',
                    textTransform: 'none',
                    borderRadius: '30px',
                    width: '150px',
                    height: '45px',
                    ml: 80,
                    fontSize: 15,
                    '&:hover': { cursor: 'pointer', backgroundColor: '#812AB8' }
                }}
            >
                New Song
            </Button>
            { modalJSX }
        </Grid>

    )
}

export default SongCatalogScreen;