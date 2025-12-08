import { Link, useHistory } from 'react-router-dom'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/icons-material/Menu';
import MusicNote from '@mui/icons-material/MusicNote';
import Typography from '@mui/material/Typography';

export default function WelcomeScreen() {
    const history = useHistory();

    function handleContinueAsGuest(event) {
        history.push('/playlist');
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontSize: 45, fontWeight: "bold", color: "#616161" }}>
                    The Playlister
                </Typography>
                <Box sx={{ marginTop: 5, position: "relative" }} >
                    <MusicNote sx={{ transform: 'translateX(-20%) rotate(180deg)', fontSize: 230 }} />
                    <Menu sx={{ fontSize: 180, position: 'absolute', top: 70, left: 65 }} />
                </Box>
                <Box sx={{ display: 'flex', marginTop: 10, gap: 5 }} >
                    <Button 
                        variant="contained" 
                        onClick={handleContinueAsGuest}
                        sx={{
                            backgroundColor: 'black',
                            textTransform: 'none',
                            width: 170,
                            borderRadius: '5px',
                            '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                        }}
                    >
                        Continue as Guest
                    </Button>
                    <Button 
                        component={Link} 
                        to="/login/" 
                        variant="contained" 
                        sx={{
                            backgroundColor: 'black',
                            textTransform: 'none',
                            width: 170,
                            borderRadius: '5px',
                            '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                        }}
                    >
                        Login
                    </Button>
                    <Button 
                        component={Link} 
                        to="/register/" 
                        variant="contained" 
                        sx={{
                            backgroundColor: 'black',
                            textTransform: 'none',
                            width: 170,
                            borderRadius: '5px',
                            '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}