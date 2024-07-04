import { useContext, useState } from "react";
import { Box, Button, Typography, Link, TextField, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        }
        localStorage.setItem('userLoginInfo', JSON.stringify(user));
        navigate('/auth/2fa', { state: { from: location.pathname }});
    }

    return (
        <Box flex={0.5} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                <Typography variant="h4" color="primary" mb={1} width={1} textAlign={'center'}>Access your healthcare dashboard</Typography>
                <Typography variant="subtitle1" color="inherit" mb={5}>New user? <Link href="/auth/register" color="primary">Create an account</Link></Typography>
                {
                location.state?.failedLogin && (
                    <Typography variant="subtitle1" color="error" mb={5}>Invalid email or password</Typography>
                )
            }
            </Box>
            <Box component="form" noValidate autoComplete="off">
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                    name="email"
                    sx={{
                        marginBottom: '1rem'
                    }}
                    required
                    value={email}
                    onChange={handleEmail}
                />
                <TextField 
                    id="password" 
                    label="Password" 
                    name="password"
                    variant="outlined" 
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    required
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    value={password}
                    onChange={handlePassword}
                />
                <Button 
                    variant="contained" 
                    size="large"
                    fullWidth 
                    onClick={handleLogin} 
                    disableElevation 
                    sx={{ 
                        marginTop: '1rem' 
                    }}>
                    Login
                </Button>
            </Box>
        </Box>
    )
};

export default Login;
