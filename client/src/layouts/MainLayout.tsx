import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext';
import { useThemeContext, ThemeProvider as TProvider } from '../contexts/ThemeContext';

const MainLayout: React.FC = () => {
    return (
        <AuthProvider>
            <TProvider>
                <CssBaseline />
                <ChildLayout />
            </TProvider>
        </AuthProvider>
    );
}

const ChildLayout = () => {
    const location = useLocation();
    const { currentTheme } = useThemeContext();
    
    return (
        <>
            {
                location.pathname.includes('app') ?
                <ThemeProvider theme={currentTheme}>
                    <Header />
                    <Outlet />
                </ThemeProvider> :
                <>
                    <Header />
                    <Outlet />
                </>
            }
        </>
    );
}

export default MainLayout;
