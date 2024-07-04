import { Box, Card, CardActionArea, CardContent, Chip, Link, Stack, Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Doctor = ({ doctor, onClick }: { doctor: any, onClick:(doctor: any) => void }) => {
    return (
        <Card variant="outlined" elevation={0}>
            <CardActionArea sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingX: 4 }} onClick={() => onClick(doctor)}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef85'} p={2} borderRadius={'50%'} mr={5}>
                    <LocalHospitalIcon fontSize="large" color={'primary'}></LocalHospitalIcon>
                </Box>
                <CardContent>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="body1" mr={1}>{doctor.name}</Typography>
                        {doctor.specialization && <Chip color="primary" variant="outlined" key={doctor.specialization} size="small" label={doctor.specialization} />}
                    </Box>
                    <Typography variant="body2" my={1} fontWeight={600}>{doctor?.hospitals?.name}</Typography>
                    <Link variant="body2">{doctor.feedbacksRecieved.length} Reviews</Link>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Doctor;
