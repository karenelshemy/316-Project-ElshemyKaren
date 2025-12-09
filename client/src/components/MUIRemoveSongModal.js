import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleRemoveSong(event) {
        event.stopPropagation();
        store.removeSongFromCatalog(store.songMarkedForRemoval);
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
        open={store.currentModal === "REMOVE_SONG"}
        aria-labelledby="remove-modal-title"
        aria-describedby="remove-modal-description"
        >
        <Box sx={style1}>
            <Box sx={{ backgroundColor:'#127036', padding: '10px 5px', borderBottom: '3px solid black'}}>
                <Typography sx={{fontWeight: 'bold', color: 'white', fontSize: 20}} id="remove-modal-title" variant="h4" component="h2">
                    Remove Song?
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8DF2A9', flexGrow: 1, p: 3}}>
                <Typography id="delete-modal-description" variant="h6" sx={{color: "#545353", mt: 7, fontSize: 45, ml: 3}}>
                    Are you sure you want to remove the song from the catalog?
                </Typography>
                <Typography sx={{ fontSize: 20, color: "#545353", mt: 8, ml: 3 }}>
                    Doing so will remove it from all of your playlists.
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 50 }}>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 14, ml: 6 ,'&:hover': { cursor: 'pointer', backgroundColor: '#333232' }}} variant="contained" onClick={handleRemoveSong}> Remove Song </Button>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 14, '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }}} variant="contained" onClick={handleCloseModal}> Cancel </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
    );
}