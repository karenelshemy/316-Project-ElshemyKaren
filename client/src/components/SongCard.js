import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import MUIRemoveSongModal from './MUIRemoveSongModal';
import MUIEditSongModal from './MUIEditSongModal';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function SongCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { song } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchEl, setAnchEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMenu2Open = Boolean(anchEl);

    let ownedByUser = false;
    for (const user of song.users) {
        if (user === auth.user.email) {
            ownedByUser = true;
            break;
        }
    }
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenu2Open = (event) => {
        setAnchEl(event.currentTarget);
    };

    const handleMenu2Close = () => {
        setAnchEl(null);
    };

    async function handleAddToPlaylist(event, id) {
        event.stopPropagation();
        store.addSongToPlaylist(song._id, id);
        handleMenu2Close();
        handleMenuClose();
    } 

    async function handleRemoveSong(event, id) {
        event.stopPropagation();
        store.showRemoveSongModal(id);
    }

    async function handleEditSong(event, id, song) {
        event.stopPropagation();
        store.showEditSongModal(id, song);
    }

    let modalJSX = "";
    if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />
    } else if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }

    let cardElement =
        <ListItem
            id={song._id}
            key={song._id}
            sx={{ 
                border: ownedByUser ? "2px solid red" : '1px solid black', 
                borderRadius:"15px", 
                p: "10px", 
                bgcolor: '#F7EBA3', 
                marginTop: '15px', 
                display: 'flex', 
                justifyContent: 'space-between',
                height: 80, 
                width: 550,
                '&:hover': { cursor: 'pointer', backgroundColor: '#E8DC97'}
            }}
        >
            <Typography sx={{ fontSize: 17, fontWeight: 'bold', position: 'relative', top: -10 }}>
                {song.title} by {song.artist} ({song.year})
            </Typography>
            <Box sx={{ mt: 5, mr: 4 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 'bold' }} >
                    Playlists: {song.playlists}
                </Typography>
            </Box>
            <IconButton onClick={handleMenuOpen} sx={{ position: 'absolute', top: 7, right: 11 }}
            >
                <MoreVertIcon style={{ color: 'black' }}/>
            </IconButton>
            <Menu
                id='song-menu'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenu2Open} sx={{ py: 2, '&:hover': { cursor: 'pointer', bgcolor: '#DE9CFF'} }}>Add to Playlist</MenuItem>
                <MenuItem onClick={(event) => handleEditSong(event, song._id, song)} sx={{ py: 2, '&:hover': { cursor: 'pointer', bgcolor: '#DE9CFF'} }}>Edit Song</MenuItem>
                <MenuItem onClick={(event) => handleRemoveSong(event, song._id)} sx={{ py: 2, height: 60, '&:hover': { cursor: 'pointer', bgcolor: '#DE9CFF'} }}>Remove from Catalog</MenuItem>
            </Menu>
            <Menu
                id='playlist-menu'
                anchorEl={anchEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isMenu2Open}
                onClose={handleMenu2Close}
            >
            </Menu>
        </ListItem>
    return (
        <>
        {cardElement}
        {modalJSX}
    </>
    );
}

export default SongCard;