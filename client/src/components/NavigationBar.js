import { useHistory } from 'react-router-dom'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function NavigationBar() {
    const history = useHistory();

    const handleClickPlaylists = () => {
        history.push("/playlist/");
    }

    const handleClickCatalog = () => {
        history.push("/songscatalog/")
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                variant="contained"
                onClick={handleClickPlaylists}
                sx={{
                    backgroundColor: 'black',
                    textTransform: 'none',
                    borderRadius: '10px',
                    width: '80px',
                    height: '35px',
                    ml: 2,
                    fontSize: 12,
                    '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                }}
            >
                Playlists
            </Button> 
            <Button
                variant="contained"
                onClick={handleClickCatalog}
                sx={{
                    backgroundColor: '#3C58D6',
                    textTransform: 'none',
                    borderRadius: '10px',
                    width: '110px',
                    height: '35px',
                    ml: 2,
                    fontSize: 12,
                    '&:hover': { cursor: 'pointer', backgroundColor: '#334BB5' }
                }}
            >
                Song Catalog
            </Button> 
        </Box>
    )
}

export default NavigationBar;