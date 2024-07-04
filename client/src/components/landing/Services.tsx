import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import appointmentBookingImage from './images/image1.jpeg'; 
import insurancePurchaseImage from './images/instant-purchase.jpg'; 
import onlineChatImage from './images/chat.jpeg';
export function Services() {
  const serviceList = [
    { title: 'Appointment Booking', description: 'Book your next appointment with ease.',backgroundImage: appointmentBookingImage},
    { title: 'Insurance Purchase', description: 'Get the best insurance deals.',backgroundImage: insurancePurchaseImage },
    { title: 'Online Chat', description: 'Connect with doctors online instantly.', backgroundImage:onlineChatImage },
   
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>Our Services</Typography>
      <Grid container spacing={3}>
        {serviceList.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent
                sx={{ display:'flex',flexDirection:'column',alignitems:'center',justifyContent:'center',padding:'20px',minHeight:'200px'}}>
                 <div
                  style={{
                    backgroundImage: `url(${service.backgroundImage})`, 
                    backgroundSize: '80%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%', 
                    height: '150px', 
                  }}
                />
                <Typography variant="h6" style={{marginTop:'10px'}}>{service.title}</Typography>
                <Typography>{service.description}</Typography>
              </CardContent>
            </Card>
            </Grid>
        ))}
      </Grid>
    </Container>
  );
}
