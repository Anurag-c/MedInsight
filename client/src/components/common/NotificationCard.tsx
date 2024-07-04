import { Box, Card, CardContent, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useThemeContext } from "../../contexts/ThemeContext";

const NotificationCard = ({notification}: {notification: any}) => {
    const theme = useThemeContext();
    const primary = theme?.currentTheme?.palette.primary;
    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ background: primary.main, width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <NotificationsIcon />
                </Box>
                <Box ml={5}>
                    <Typography variant="caption">{notification.date}</Typography>
                    <Typography variant="body1">{notification.body}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default NotificationCard;