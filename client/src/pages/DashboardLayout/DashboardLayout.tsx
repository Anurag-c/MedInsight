import React, { useContext } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
    const auth = useContext(AuthContext);
    const drawerWidth = 240;

    if (!auth?.authState?.isLoggedIn) {
        return <Navigate to="/auth/login" replace />
    }

    return (
        <>
            <Sidebar />
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px`, padding: 4, height: `calc(100vh - 64px)`, overflowY: 'scroll' }}>
                <Outlet />
            </Box>
        </>
    );
}

export default DashboardLayout;
