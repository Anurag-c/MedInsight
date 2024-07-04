import { useThemeContext } from "../../contexts/ThemeContext";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const theme = useThemeContext();
    const primary = theme?.currentTheme.palette.primary.main;

    return (
        <Box height={1} display={'flex'}>
            <Box flex={0.5} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} borderRight={1} borderColor={primary}>
                <Typography variant="h3" mb={5}>
                    Welcome back!
                </Typography>
                <Box textAlign={'center'} mb={5}>
                    <img src={require('../../assets/43071.jpg')} width="50%" alt="A hospital network with happy faces" />
                </Box>
                <Typography variant="h2" color="primary" textAlign={'center'}>
                    Healthcare at your fingertips!
                </Typography>
            </Box>
            <Outlet />
        </Box>
    )
}

export default AuthLayout;