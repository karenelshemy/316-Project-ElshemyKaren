import { useContext, useState } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );
    };

    function handleUpdateEmail(event) {
        setEmail(event.target.value);
    }

    const handleClearEmail= () => {
        setEmail("");
    }

    
    function handleUpdatePassword(event) {
        setPassword(event.target.value);
    }

    const handleClearPassword= () => {
        setPassword("");
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
                <LockOutlinedIcon fontSize="large"/>
                <Typography component="h1" variant="h5" sx={{ color: "#616161", fontSize: 30 }}>
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="standard"
                        value={email}
                        onChange={handleUpdateEmail}
                        InputLabelProps={{
                            style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                        }}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearEmail} sx={{ top: "-5px" }} >
                                        <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
                                    </IconButton>
                                </InputAdornment>
                        }}
                        inputProps={{
                            style: { paddingLeft: "10px" }
                        }}
                        sx= {{
                            backgroundColor: "#EAD9FA"
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={handleUpdatePassword}
                        InputLabelProps={{
                            style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                        }}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearPassword} sx={{ top: "-5px" }} >
                                        <CancelOutlinedIcon sx={{ color: "black", fontSize: 20 }}/>
                                    </IconButton>
                                </InputAdornment>
                        }}
                        inputProps={{
                            style: { paddingLeft: "10px" }
                        }}
                        sx= {{
                            backgroundColor: "#EAD9FA"
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 3, 
                            mb: 2,
                            backgroundColor: 'black',
                            textTransform: 'none',
                            '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                        }}
                    >
                        SIGN IN
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register/" variant="body2" sx={{ color: "#C70202", fontWeight: "bold", textDecoration: 'none' }}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 25 }} />
                </Box>
            </Box>
        </Container>
    );
}