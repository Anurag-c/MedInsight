import { Box, Typography, Stack, Chip, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useParams } from "react-router-dom";
import { Helper } from "../../services/helper";
import Feedback from "../../components/doctors/Feedback";
import { useThemeContext } from "../../contexts/ThemeContext";
import { DateCalendar } from "@mui/x-date-pickers";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from "dayjs";
import CreateEditFeedback from "../../components/doctors/CreateEditFeedback";
dayjs.extend(localizedFormat);
dayjs.extend(utc);

const DoctorDetail = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const theme = useThemeContext();
    const primary = theme.currentTheme.palette.primary;
    const { doctorId } = useParams<any>();
    const [doctor, setDoctor] = useState<any>(null);
    const [selectedDay, setSelectedDay] = useState<Dayjs | any>(null);
    const [timeSlots, setTimeSlots] = useState<{}[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [notes, setNotes] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleDayChange = (day: any) => {
        setSelectedDay(day);
        const slots = doctor.slots.filter((slot: any) => {
            return dayjs(slot.startTime).utc().isSame(dayjs(day), 'day') && !slot.isBooked
        })
        setTimeSlots(slots);
    }

    const handleBookAppointment = async () => {
        const res = await Helper.bookAppointment(selectedSlot.id);
        if (res) {
            setOpen(true);
        }
    }

    const handleDialogClose = async (feedback: any) => {
        feedback && await editFeedback(feedback);
        setDialogOpen(false);
        setSelectedFeedback(null);
    }

    const editFeedback = async (feedback: any) => {
        const res = await Helper.editFeedback(feedback);

        if (res) {
            Helper.getDoctorById(doctorId).then((res: any) => setDoctor(res));
        }
    }

    const handleEditFeedback = (feedback: any) => {
        setSelectedFeedback(feedback);
        setDialogOpen(open => !open);
    }

    useEffect(() => {
        Helper.getDoctorById(doctorId).then((res: any) => setDoctor(res));
    }, [doctorId])
    return (
        <Box height={'100%'}>
            {user.role === 'patient' && <Typography variant="h6" mb={5}>Book an appointment</Typography>}
            <Box height={'100%'} component={'div'} display={'flex'}>
                <Box px={2} component={'div'} flex={user.role === 'patient' ? 0.5 : 1} borderRight={user.role === 'patient' ? 1 : 0} borderColor={primary.main}>
                    <Box component={'div'} display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef85'} p={3} borderRadius={'50%'} mr={5}>
                            <LocalHospitalIcon fontSize="large" color={'primary'}></LocalHospitalIcon>
                        </Box>
                        <Box component={'div'}>
                            <Typography variant="body1" mb={1} fontWeight={600} color={'primary'}>{doctor?.name}</Typography>
                            <Typography variant="body2" mb={1}>{doctor?.hospital?.name}</Typography>
                            <Chip color="primary" variant="outlined" key={doctor?.specialization} size="small" label={doctor?.specialization} />
                        </Box>
                    </Box>
                    <Box mt={3} display={'flex'} flexDirection={'column'} gap={1}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderBottom={1} borderColor={'lightgray'} pb={1} mb={2}>
                            <Typography variant="body1">Reviews</Typography>
                        </Box>
                        {
                            doctor?.feedbacksRecieved?.length ? (
                                <>
                                    {
                                        doctor?.feedbacksRecieved.map((feed: any) => <Feedback key={feed.id} feedback={feed} onEditFeedback={handleEditFeedback} />)
                                    }
                                </>
                            ) : (
                                <Typography variant="body2">No reviews</Typography>
                            )
                        }
                        <CreateEditFeedback feedback={selectedFeedback} open={dialogOpen} onClose={handleDialogClose} type="edit" />
                    </Box>
                </Box>
                {
                    user.role === 'patient' && (
                        <Box component={'div'} flex={0.5}>
                            <Box px={3} component={'div'}>
                                <Typography variant="body1" fontWeight={600}>Appointment Details</Typography>
                                <Typography variant="body1" mt={3} mb={1}>Please select a date</Typography>
                                <DateCalendar views={['day']} disablePast value={selectedDay} onChange={(newValue) => handleDayChange(newValue)} />
                                {
                                    selectedDay && (
                                        <Box component={'div'} mt={3}>
                                            {
                                                timeSlots.length ? (
                                                    <>
                                                        <Typography variant="body1" mb={1}>Please choose a time slot</Typography>
                                                        <Stack direction={'row'} gap={1} flexWrap={'wrap'} mb={2}>
                                                            {
                                                                timeSlots.map((slot: any) => (
                                                                    <Chip
                                                                        key={slot.id}
                                                                        label={dayjs(slot.startTime).utc().format('H:mm')}
                                                                        color="primary"
                                                                        size="small"
                                                                        variant={selectedSlot?.id === slot.id ? 'filled' : 'outlined'}
                                                                        clickable
                                                                        onClick={() => setSelectedSlot(slot)}
                                                                        sx={{ paddingX: 1 }}
                                                                    />
                                                                ))
                                                            }            
                                                        </Stack>
                                                        <TextField
                                                            id="notes"
                                                            label="Appointment Notes (optional)"
                                                            multiline
                                                            fullWidth
                                                            rows={2}
                                                            value={notes}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                                                            variant="outlined"
                                                        />
                                                        <Button sx={{ marginTop: 3 }} disabled={!selectedSlot} variant="contained" disableElevation onClick={handleBookAppointment}>Book appointment</Button>
                                                        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                                                            <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                                                        Your appointment has been booked successfully.
                                                            </Alert>
                                                        </Snackbar>
                                                    </>
                                                ) : (
                                                    <Typography variant="body1" textAlign={'center'} color={'gray'} fontWeight={600}>Sorry, no slots available</Typography>
                                                )
                                            }
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
}

export default DoctorDetail;
