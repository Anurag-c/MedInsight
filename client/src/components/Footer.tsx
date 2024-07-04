import { Container, Typography } from '@mui/material';

export function Footer() {
    return (
      <Container sx={{ backgroundColor: '#f7f7f7', padding: '20px 0', textAlign: 'center' }}>
        <Typography>&copy; 2023 MedInsights. All rights reserved.</Typography>
      </Container>
    );
}
  