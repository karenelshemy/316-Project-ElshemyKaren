import { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth'
import authRequestSender from '../auth/requests'
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

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [avatar, setAvatar] = useState("");

    const [isEmailIncorrect, setIsEmailIncorrect] = useState(false);
    const [isPasswordFieldClicked, setIsPasswordFieldClicked] = useState(false);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [isPasswordConfirmFieldClicked, setIsPasswordConfirmFieldClicked] = useState(false);
    const [isPasswordConfirmIncorrect, setIsPasswordConfirmIncorrect] = useState(false);

    useEffect(() => {
        if (password !== passwordConfirm) {
            setIsPasswordConfirmIncorrect(true);
        } else {
            setIsPasswordConfirmIncorrect(false);
        }
    }, [password, passwordConfirm]);

    useEffect(() => {
        if (password === "") {
            setIsPasswordIncorrect(false);
        } else if (password.length < 8) {
            setIsPasswordIncorrect(true);
        }
    }, [password]);

    const canSubmit = () => {
        return (userName.trim() !== "" && email.trim() !== "" && password.trim() !== "" && passwordConfirm.trim() !== "" && avatar !== ""
            && isEmailIncorrect === false && isPasswordIncorrect === false && isPasswordConfirmIncorrect === false)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.registerUser(
            formData.get('userName'),
            formData.get('email'),
            formData.get('password'),
            formData.get('passwordConfirm'),
            avatar
        );
    };

    function handleUpdateUsername(event) {
        setUserName(event.target.value);
    }

    const handleClearUsername = () => {
        setUserName("");
    }
    
    async function handleUpdateEmail(event) {
        setEmail(event.target.value);

        const response = await authRequestSender.existingUser(event.target.value);
        if (response.data.success === false) {
            setIsEmailIncorrect(true);
        } else {
            setIsEmailIncorrect(false);
        }
    }

    const handleClearEmail = () => {
        setEmail("");
        setIsEmailIncorrect(false);
    }

    const handlePasswordFieldClicked = () => {
        setIsPasswordFieldClicked(true);
    }
    
    function handleUpdatePassword(event) {
        setPassword(event.target.value);
        if (isPasswordFieldClicked && event.target.value.length < 8) {
            setIsPasswordIncorrect(true);
        } else {
            setIsPasswordIncorrect(false);
        }
    }

    const handleClearPassword = () => {
        setPassword("");
        setIsPasswordFieldClicked(false);
        setIsPasswordIncorrect(false);
    }

    const handlePasswordConfirmFieldClicked = () => {
        setIsPasswordConfirmFieldClicked(true);
    }
    
    function handleUpdatePasswordConfirm(event) {
        setPasswordConfirm(event.target.value);
        if (event.target.value !== password) {
            setIsPasswordConfirmIncorrect(true);
        } else {
            setIsPasswordConfirmIncorrect(false);
        }
    }

    const handleClearPasswordConfirm = () => {
        setPasswordConfirm("");
        setIsPasswordConfirmFieldClicked(false);
        setIsPasswordConfirmIncorrect(false);
    }

    function handleSelectAvatar(event) {
        const file = event.target.files[0]
        if (file.type !== "image/png") {
            window.alert("File must be a .png.");
            return;
        }
        const image = new Image();
        image.onload = function() {
            if (image.width !== 250 || image.height !== 250) {
                window.alert("Image must be of size 250 x 250.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function() {
                setAvatar(reader.result)
            };
            reader.readAsDataURL(file);
        }
        const imageURL = URL.createObjectURL(file);
        image.src = imageURL;
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
                    <Typography component="h1" variant="h5" sx={{ color: "#616161", mt:1 }}>
                        Create Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Avatar src={avatar}
                                sx={{
                                    width: 40, 
                                    height: 40,
                                    left: 350, 
                                    top: 240,
                                    position: 'absolute'
                                }}
                                />
                                <Button 
                                    variant="contained"
                                    component="label"
                                    sx={{ 
                                        ml: -10,
                                        mt: 6,
                                        backgroundColor: 'black',
                                        textTransform: 'none',
                                        position: 'absolute',
                                        borderRadius: '10px',
                                        width: '20px',
                                        height: '22px',
                                        fontSize: 12,
                                        '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                                    }}
                                >
                                    Select
                                    <input
                                        type="file"
                                        accept="image/png"
                                        hidden
                                        onChange={handleSelectAvatar}
                                    />
                                </Button>
                                <TextField
                                    autoComplete="uname"
                                    name="userName"
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                    variant="standard"
                                    value={userName}
                                    onChange={handleUpdateUsername}
                                    InputLabelProps={{
                                        style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                                    }}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClearUsername} sx={{ top: "-5px" }} >
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    variant="standard"
                                    value={email}
                                    onChange={handleUpdateEmail}
                                    error={isEmailIncorrect}
                                    helperText={isEmailIncorrect && "An account with this email address already exists." }
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="standard"
                                    value={password}
                                    onChange={handleUpdatePassword}
                                    onFocus={handlePasswordFieldClicked}
                                    error={isPasswordIncorrect && isPasswordFieldClicked}
                                    helperText={isPasswordIncorrect && isPasswordFieldClicked && "Password must be at least 8 characters." }
                                    InputLabelProps={{
                                        style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                                    }}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClearPassword} sx={{ top: "-5px" }} >
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Password Confirm"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="new-password"
                                    variant="standard"
                                    value={passwordConfirm}
                                    onChange={handleUpdatePasswordConfirm}
                                    onFocus={handlePasswordConfirmFieldClicked}
                                    error={isPasswordConfirmIncorrect && isPasswordConfirmFieldClicked}
                                    helperText={isPasswordConfirmIncorrect && isPasswordConfirmFieldClicked && "Passwords do not match." }
                                    InputLabelProps={{
                                        style: { color: "black", top: "-5px", left: "10px", fontSize: 15 }
                                    }}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClearPasswordConfirm} sx={{ top: "-5px" }} >
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!canSubmit()}
                            sx={{
                                mt: 3, 
                                mb: 2,
                                backgroundColor: 'black',
                                textTransform: 'none',
                                '&:hover': { cursor: 'pointer', backgroundColor: '#333232' }
                            }}
                        >
                            Create Account
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2" sx={{ color: "#C70202", fontWeight: "bold", textDecoration: 'none' }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 15 }} />
            </Container>
    );
}