import { Card, Box, CardContent, CardActions, Button, Typography, IconButton } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(relativeTime)

export interface AppointmentProps {
    appointment: any,
    onCancel?: (appointment: any) => void,
    onAddFeedback?: (appointment: any) => void
    onMessage?: (appointment: any) => void
}
const Appointment = ({ appointment, onCancel, onAddFeedback, onMessage }: AppointmentProps) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [hasUserReviewed, setHasUserReviewed] = useState(false);

    const getTimeToAppointment = (startTime: any) => {
        const now = dayjs(new Date());
        return dayjs(now).to(startTime);
    }

    useEffect(() => {
        setHasUserReviewed(appointment.doctors?.feedbacksRecieved?.some((feed: any) => feed.patientId === user.id));
    }, [appointment])
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef85'} p={2} borderRadius={'50%'} mr={5}>
                <EventAvailableIcon fontSize="large" color={'primary'}></EventAvailableIcon>
            </Box>
            <CardContent>
                <Box>
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                        <Typography variant="body1">{user.role === 'patient' ? appointment?.doctors?.name : appointment?.patients?.name}</Typography>
                        <Typography variant="body2" border={1} borderRadius={3} px={1} my={1} color={'primary'}>{getTimeToAppointment(appointment.startTime)}</Typography>
                    </Box>
                    {user.role === 'patient' && appointment?.doctor?.hospitals?.name && <Typography variant="body2" fontStyle={'italic'}>At - {appointment?.doctor?.hospital?.name}</Typography>}
                </Box>
                <Typography variant="body1" my={1} color={'primary'} fontWeight={'bold'}>{dayjs(appointment.startTime).utc().format('MMM D, YYYY h:mm A')}</Typography>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    { user?.role === 'patient' && onMessage && <IconButton sx={{ p: 1 }} size="small" color="primary" onClick={() => onMessage(appointment)}>
                        <ChatIcon fontSize='small' />
                    </IconButton>}
                    { user?.role === 'patient' && onAddFeedback && <Button size='small' variant="text" color="primary" disabled={hasUserReviewed} startIcon={!hasUserReviewed && <AddIcon />} onClick={() => onAddFeedback(appointment)}>{ hasUserReviewed ? 'Reviewed' : 'Add Review'}</Button> }
                    { onCancel && !appointment.isComplete && <Button size='small' color="primary" onClick={() => onCancel(appointment)}>Cancel</Button> }
                </Box>
            </CardActions>
        </Card>
    );
}

export default Appointment;
