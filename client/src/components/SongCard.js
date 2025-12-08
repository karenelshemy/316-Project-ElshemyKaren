import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function SongCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { song } = props;

    let ownedByUser = false;
    for (const user of song.users) {
        if (user === auth.user.email) {
            ownedByUser = true;
            break;
        }
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
        </ListItem>
    return (
        cardElement
    );
}

export default SongCard;