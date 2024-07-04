import { Container, Typography, Paper } from '@mui/material';

export function ProductGoal() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', padding: '20px 0' }}>
      <Typography variant="h4" sx={{  fontSize: '40px', fontFamily: 'Arial, serif', color: 'black' }}>
        Our Goal
      </Typography>
      <Paper sx={{ padding: '20px', backgroundColor: 'rgba(147, 112, 219, 0.9)', color: 'white' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'Arial, serif' }}>
          Connecting patients, doctors, and insurance companies seamlessly.
        </Typography>
        <Typography sx={{ fontSize: '20px', fontFamily: 'Arial, serif' }}>
          At MedInsights, our mission is to transform the way healthcare is managed and delivered by connecting patients, doctors, and insurance companies seamlessly. We envision a future where the entire healthcare ecosystem works in harmony to prioritize the well-being of individuals, streamline processes, and ensure access to high-quality care. With our platform, we're making this vision a reality.
        </Typography>
      </Paper>
    </Container>
  );
}