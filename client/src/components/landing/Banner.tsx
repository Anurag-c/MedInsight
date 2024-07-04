import { Container, Typography } from '@mui/material';
import omniPlatformImage from './images/photo.jpeg';
export function Banner() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', padding: '40px 0',backgroundImage:`url(${omniPlatformImage})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <Typography variant="h2" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>Welcome to MedInsights</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>Your omni-platform for healthcare needs</Typography>
    </Container>
  );
}
