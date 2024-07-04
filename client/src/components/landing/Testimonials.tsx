import { Container, Typography, Paper, Grid } from '@mui/material';

export function Testimonials() {
  const testimonialsList = [
    { author: 'Alice', quote: 'Life-changing experience with MedInsights. The platform has made it incredibly easy for me to manage my healthcare, from appointments to insurance claims. I highly recommend it.' },
    { author: 'John', quote: 'MedInsights has transformed the way I work as a healthcare professional. It streamlines communication with patients and insurance providers, making my job more efficient and effective.' },
    { author: 'Samantha', quote: 'I used to spend hours dealing with insurance paperwork. MedInsights has saved me time and hassle by simplifying the entire process. It\'s a game-changer.' },
    // Add more testimonials here
  ];

  return (
    <Container sx={{ padding: '40px 0' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>What Our Users Say</Typography>
      <Grid container spacing={3}>
        {testimonialsList.map((testimonial, index) => (
          <Grid item xs={12} key={index} sx={{ display: 'flex' }}>
            <Paper sx={{ padding: '20px', flexGrow: 1, backgroundColor: '#9370DB', color: 'white', boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.4)' }}>
              <Typography variant="subtitle1" sx={{ fontSize: '18px', textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)' }}>{testimonial.quote}</Typography>
              <Typography variant="subtitle2">- {testimonial.author}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )}
  