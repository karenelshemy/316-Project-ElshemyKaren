import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import PlaylistCard from './PlaylistCard';
import MUIDeleteModal from './MUIDeleteModal';
import MUIEditPlaylistModal from './MUIEditPlaylistModal';
import MUIPlayPlaylistModal from './MUIPlayPlaylistModal';

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

const PlaylistsScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [playlistName, setPlaylistName] = useState("");
    const [userName, setUserName] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [songYear, setSongYear] = useState("");

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handlePlaylistName(event) {
        setPlaylistName(event.target.value);
    }

    const handleClearPlaylistName = () => {
        setPlaylistName("");
    }
    
    function handleUserName(event) {
        setUserName(event.target.value);
    }

    const handleClearUserName = () => {
        setUserName("");
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

    const handleSearchPlaylists = () => {
        if (!playlistName.trim() && !userName.trim() && !songTitle.trim() && !songArtist.trim() && !songYear.trim()) {
            store.loadIdNamePairs();
            return;
        }
        store.queryPlaylists({ 
            name : playlistName.trim().toLowerCase(),
            owner: userName.trim().toLowerCase(),
            title: songTitle.trim().toLowerCase(),
            artist: songArtist.trim().toLowerCase(),
            year: songYear.trim().toString() 
        })
    }

    function handleClear(event) {
        setPlaylistName("");
        setUserName("");
        setSongTitle("");
        setSongArtist("");
        setSongYear("");
        store.loadIdNamePairs();
    }

    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
            handleSearchPlaylists();
        }
    }

    let modalJSX = "";
    if (store.isEditPlaylistModalOpen()) {
        modalJSX = <MUIEditPlaylistModal />;
    } else if (store.isDeleteListModalOpen()) {
        modalJSX = <MUIDeleteModal />;
    } else if (store.isPlayListModalOpen()) {
        modalJSX = <MUIPlayPlaylistModal />;
    }
    
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={6} sx={{ borderRight: '1px solid lightgray', height: '630px', marginTop: 2 }}>
                <Typography variant="h4" sx={{ color: "rgb(204, 0, 204)", fontWeight: 1000, paddingLeft: 2, marginTop: 4, fontSize: 35 }}>
                    Playlists
                </Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={10}>
                            <TextField
                                name="playlistName"
                                fullWidth
                                id="playlistName"
                                placeholder="by Playlist Name"
                                variant="standard"
                                value={playlistName}
                                onChange={handlePlaylistName}
                                onKeyDown={handleKeyPress}
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
                                    style: { paddingLeft: "10px" }
                                }}
                                sx= {{
                                    backgroundColor: "#EAD9FA",
                                    marginLeft: 2,
                                    marginTop: 4,
                                    paddingTop: '9px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                name="userName"
                                fullWidth
                                id="userName"
                                placeholder="by User Name"
                                variant="standard"
                                value={userName}
                                onChange={handleUserName}
                                onKeyDown={handleKeyPress}
                                InputLabelProps={{
                                    style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                                }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClearUserName} sx={{ top: "-5px" }} >
                                                <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                inputProps={{
                                    style: { paddingLeft: "10px" }
                                }}
                                sx= {{
                                    paddingTop: '9px',
                                    backgroundColor: "#EAD9FA",
                                    marginLeft: 2,
                                }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                name="songTitle"
                                placeholder="by Song Title"
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
                                placeholder="by Song Artist"
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
                                placeholder="by Song Year"
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
                        startIcon={<SearchIcon />}
                        onClick={handleSearchPlaylists}
                        sx={{
                            mt: 6, 
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
                            mt: 6, 
                            backgroundColor: '#583A8C',
                            textTransform: 'none',
                            borderRadius: '30px',
                            width: '115px',
                            height: '45px',
                            ml: 29,
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
                        {store.idNamePairs.map((pair) => (
                            <PlaylistCard   
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))} 
                    </List>
                 </Box>
            </Grid>
            { modalJSX }
            <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ 
                    mt: -25,
                    backgroundColor: '#583A8C',
                    textTransform: 'none',
                    borderRadius: '30px',
                    width: '150px',
                    height: '45px',
                    ml: 80,
                    fontSize: 15,
                    '&:hover': { cursor: 'pointer', backgroundColor: '#812AB8' }
                }}
                onClick={() => store.createNewList()}
            >
                New Playlist
            </Button>
        </Grid>

    )
}

export default PlaylistsScreen;