import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { Helper } from "../../services/helper";
import AuthContext from "../../contexts/AuthContext";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChatIcon from '@mui/icons-material/Chat';
import { useThemeContext } from "../../contexts/ThemeContext";
import Divider from '@mui/material/Divider';
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const getIcon = (item: any) => {
    switch (item.name) {
        case 'Home':
            return <HomeIcon />
        case 'Appointments':
            return <CalendarMonthIcon />
        case 'Doctors':
            return <MedicationIcon />
        case 'Patients':
            return <GroupAddIcon />
        case 'Plans':
            return <ChecklistIcon />
        case 'Insurers':
            return <MedicalInformationIcon />
        case 'Insurances':
            return <MedicalInformationIcon />
        case 'Messages':
            return <ChatIcon />
        case 'Settings':
            return <SettingsIcon />
        default:
            break;
    }
}

const Sidebar = () => {
    const auth = useContext(AuthContext);
    const authUser = auth?.authState.user?.token ? auth.authState?.user?.user : auth?.authState?.user;
    const theme = useThemeContext();
    const [sidebarOptions, setSidebarOptions] = useState<{}[]>([]);
    const [user, setUser] = useState(authUser);
    const primary = theme?.currentTheme.palette.primary.main;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const goToRoute = (route: string) => {
        navigate(route);
    }

    useEffect(() => {
        setUser(authUser);
        const options = Helper.getSidebarOptionsByRole(authUser?.role);
        setSidebarOptions(options);
    }, [auth]);
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={2} sx={{ color: primary }}>
                    <PersonIcon />
                </Box>
                <Box>
                    <Typography>{user?.name}</Typography>
                    <Typography variant="subtitle2" fontStyle={'italic'} textTransform={'capitalize'}>{user?.role}</Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {sidebarOptions.map((opt: any) => (
                    <ListItem key={opt.id} disablePadding onClick={() => goToRoute(opt.path)}>
                        <ListItemButton selected={pathname === opt.path}>
                            <ListItemIcon sx={{ color: primary }}>
                                {getIcon(opt)}
                            </ListItemIcon>
                            <ListItemText primary={opt.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;