import { Container, Typography, TextField, Button } from '@mui/material';

export function ContactUs() {
  return (
    <Container sx={{ padding: '40px 0' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>Contact Us</Typography>
      <form>
        <TextField fullWidth label="Name" sx={{ marginBottom: 2 }} />
        <TextField fullWidth label="Email" sx={{ marginBottom: 2 }} />
        <TextField fullWidth label="Message" multiline rows={4} sx={{ marginBottom: 2 }} />
        <Button variant="contained" color="primary" type="submit" sx={{backgroundColor:'#9370DB'}}>Submit</Button>
      </form>
    </Container>
  );
}

