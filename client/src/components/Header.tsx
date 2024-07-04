	import { AppBar, Box, Toolbar, Button, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';

export function Header() {
  const auth = useContext(AuthContext);
  const { toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const isLoggedIn = auth?.authState?.isLoggedIn;

  const handleLogout = () => {
    auth?.dispatch({
      type: 'LOGOUT'
    });
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" sx={{ flexGrow: 1 }} color="inherit" underline="none">
          <Typography variant="h6" sx={{ flexGrow: 1 }} color={'white'}>MedInsights</Typography>
        </Link>
        {/* <Button color="inherit" onClick={handleMessengerClick}>Messenger</Button> */}
        {
          isLoggedIn ? (
            <Box>
              <Link color="inherit">
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Link>
            </Box>)
             : (
              <div className="d-flex">
                <Button href="/auth/login" color="inherit">Login</Button>
                <Button href="/auth/register" color="inherit">Register</Button>
              </div>
            )
        }
      </Toolbar>
    </AppBar>
  );
}	
export default Header;