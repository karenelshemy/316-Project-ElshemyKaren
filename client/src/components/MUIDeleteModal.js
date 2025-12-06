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

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
        open={store.listMarkedForDeletion !== null}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        >
        <Box sx={style1}>
            <Box sx={{ backgroundColor:'#127036', padding: '10px 5px', borderBottom: '3px solid black'}}>
                <Typography sx={{fontWeight: 'bold', color: 'white', fontSize: 20}} id="delete-modal-title" variant="h4" component="h2">
                    Delete Playlist?
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8DF2A9', flexGrow: 1, p: 3}}>
                <Typography id="delete-modal-description" variant="h6" sx={{color: "#545353", mt: 7, fontSize: 45, ml: 3}}>
                    Are you sure you want to delete the <Typography sx={{ fontSize: 45 }} display="inline" id="delete-modal-description" variant="h6">{name}</Typography> playlist?
                </Typography>
                <Typography sx={{ fontSize: 20, color: "#545353", mt: 8, ml: 3 }}>
                    Doing so means it will be permanently removed.
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 50 }}>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 14, ml: 6}} variant="contained" onClick={handleDeleteList}> Delete Playlist </Button>
                    <Button sx={{ color: "white", backgroundColor: "black", borderRadius: "7px", width: 150, height: 40, fontSize: 13, textTransform: 'none', p:"5px", mt: 14 }} variant="contained" onClick={handleCloseModal}> Cancel </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
    );
}