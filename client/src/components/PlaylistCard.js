import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function PlaylistCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [expandCard, setExpandCard] = useState(false);
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.showDeleteListModal(id);
        //let _id = event.target.id;
        //_id = ("" + _id).substring("delete-list-".length);
    }

    async function handleEditList(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
        store.showEditPlaylistModal(id);
    }

    async function handlePlayList(event, id) {
        store.showPlayListModal(id);
    }
    
    async function handleCopyList(event, id) {
        event.stopPropagation();
        await store.copyList(id);
        store.loadIdNamePairs();
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ border: "1px solid lightgray", borderRadius:"15px", p: "10px", bgcolor: '#F8E8FF', marginTop: '15px', display: 'flex', height: 60, width: 550 }}
        >
            <Avatar alt={idNamePair.userName} src={idNamePair.avatar} 
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ p: 1, flexDirection: 'column', width: 200 }} >
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold', position: 'relative', top: -10 }}>
                        {idNamePair.name}
                    </Typography>
                    <Typography sx={{ fontSize: 10, mt: -1 }}>
                        {idNamePair.userName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: -2 }}>
                    <Button 
                        variant="contained"
                        sx={{ 
                            border: '1px solid black', 
                            bgcolor: "#C70202", 
                            fontSize: 12, 
                            textTransform: 'none', 
                            height: 30, 
                            width: 40,
                            display: idNamePair.userName === auth.user.userName ? 'flex' : 'none',
                            '&:hover': { cursor: 'pointer', backgroundColor: 'darkred', border: '1px solid black' }
                        }}
                        onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'
                    >
                        Delete
                    </Button>
                    <Button 
                        variant="contained"
                        sx={{ 
                            border: '1px solid black', 
                            bgcolor: "#3C58D6", 
                            fontSize: 12, 
                            textTransform: 'none', 
                            height: 30, 
                            width: 10,
                            display: idNamePair.userName === auth.user.userName ? 'flex' : 'none',
                            '&:hover': { cursor: 'pointer', backgroundColor: '#334BB5', border: '1px solid black' }
                        }}
                        onClick={(event) => {
                            handleEditList(event, idNamePair._id)
                        }} aria-label='edit'
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="contained"
                        sx={{ 
                            border: '1px solid black', 
                            bgcolor: "#307502", 
                            fontSize: 12, 
                            textTransform: 'none', 
                            height: 30, 
                            width: 10,
                            '&:hover': { cursor: 'pointer', backgroundColor: '#255941', border: '1px solid black' }
                        }}
                        onClick={(event) => {
                            handleCopyList(event, idNamePair._id)
                        }} aria-label='copy'
                    >
                        Copy
                    </Button>
                    <Button 
                        variant="contained"
                        sx={{ 
                            border: '1px solid black', 
                            bgcolor: 'rgb(204, 0, 204)', 
                            fontSize: 12, 
                            textTransform: 'none', 
                            height: 30, 
                            width: 10,
                            '&:hover': { cursor: 'pointer', backgroundColor: '#CC54C8', border: '1px solid black' }
                        }}
                        onClick={(event) => {
                            handlePlayList(event, idNamePair._id)
                        }} aria-label='play'
                    >
                        Play
                    </Button>
                </Box>
        </ListItem>
    return (
        cardElement
    );
}

export default PlaylistCard;