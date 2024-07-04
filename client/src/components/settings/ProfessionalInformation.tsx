import { Box, Typography, TextField, Switch, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Button, Snackbar } from "@mui/material"
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";

const ProfessionalInformation = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const days = Helper.getAllDays();
    const times = Helper.getAllTimes();
    const [userProfessionalForm, setUserProfessionalForm] = useState({
        specialization: user?.specialization,
        treatsCovid: user?.treatsCovid
    });
    const [selectedDays, setSelectedDays] = useState<{}[]>(days);

    const [submitted, setSubmitted] = useState(false);
    const [submittedFailed, setSubmittedFailed] = useState(false);

    const onSubmit = () => {
        const availability = selectedDays.filter((day: any) => day.isExpanded && day.startTime && day.endTime);
        availability.map((slot: any) => {
            slot.day = slot.value;
        })
        const payload = { ...userProfessionalForm, availability: availability };
        Helper.updateUserByRole(payload, user?.role).then((res) => {
            setSubmitted(true);
            const oldUserData = JSON.parse(localStorage.getItem('user') || '{}');
            const newUserData = { ...oldUserData, user: { ...oldUserData.user, ...res }};
            localStorage.setItem('user', JSON.stringify(newUserData));
            auth?.dispatch({
                type: 'LOGIN',
                payload: newUserData
            });
            setSubmittedFailed(false);
        }).catch((err) => {
            console.log("Error:", err);
            setSubmittedFailed(true);
        });
    }

    const handleCloseSnackbar = () => {
        setSubmitted(false);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value, checked } = e.target;
        const newValues = { ...userProfessionalForm, [name]: name === 'specialization' ? value : checked as Boolean };
        setUserProfessionalForm(newValues);
    }

    const handleDayChange = (e: React.ChangeEvent<any> | SelectChangeEvent, index: number) => {
        const { name, checked, value } = e.target;
        const updated = {...selectedDays[index], [name]: name === 'isExpanded' ? checked as Boolean : value };
        const newValues = Object.assign([...selectedDays], { [index]: updated })
        setSelectedDays(newValues);
    }

    return (
        <Box component={'form'} noValidate autoComplete="off">
            <Box>
                <Typography variant="body1" fontWeight={600} mb={1}>Specialization</Typography>
                <TextField
                    id="specialization"
                    name="specialization"
                    placeholder="Add your professional specializations here. These will be visible on your profile."
                    multiline
                    fullWidth
                    rows={1}
                    value={userProfessionalForm?.specialization ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
            </Box>
            <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <Typography variant="body1" fontWeight={600} mb={0} mr={2}>Do you treat patients with symptoms of Covid?</Typography>
                <Switch
                    name="treatsCovid"
                    checked={userProfessionalForm?.treatsCovid}
                    onChange={(e: React.ChangeEvent) => handleValueChange(e)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Box>
            <Box mt={2}>
                <Typography variant="body1" fontWeight={600} mb={1}>Availability</Typography>
                {
                    selectedDays.map((day: any, index: number) => (
                        <Box display={'flex'} alignItems={'center'} gap={2} key={index} mb={2}>
                            <Typography variant="body1">{day.label}</Typography>
                            <Switch
                                name="isExpanded"
                                value={day[index]?.isExpanded}
                                checked={day[index]?.isExpanded}
                                onChange={(e: React.ChangeEvent | SelectChangeEvent) => handleDayChange(e, index)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            {
                                day?.isExpanded && (
                                    <Box display={'flex'} alignItems={'center'} gap={2}>
                                        <FormControl sx={{ minWidth: 120 }} size="small">
                                            <InputLabel id="start-time-label">Start Time</InputLabel>
                                            <Select
                                                labelId="start-time-label"
                                                id="start-time"
                                                name="startTime"
                                                value={day?.startTime}
                                                label="Start Time"
                                                onChange={(e: SelectChangeEvent) => handleDayChange(e, index)}
                                            >
                                                {
                                                    times.map((time: any) => (
                                                        <MenuItem value={time.value}>{time.label}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: 120 }} size="small">
                                            <InputLabel id="end-time-label">End Time</InputLabel>
                                            <Select
                                                labelId="end-time-label"
                                                id="end-time"
                                                name="endTime"
                                                value={day?.endTime}
                                                label="End Time"
                                                onChange={(e: SelectChangeEvent) => handleDayChange(e, index)}
                                            >
                                                {
                                                    times.map((time: any) => (
                                                        <MenuItem value={time.value}>{time.label}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )
                            }
                        </Box>
                    ))
                }
            </Box>
            <Box flex={1} flexDirection={'row'} alignItems={'center'} mb={4}>
                <FormControl sx={{ minWidth: 350, paddingTop: 2.5 }}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </FormControl>
            </Box>
            <Box>
                {
                    submittedFailed ?
                        <Snackbar
                            open={submitted}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message={"Failed"}
                            sx={{ backgroundColor: 'red' }}
                        />
                        : <Snackbar
                            open={submitted}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message={ "Submitted"}
                            sx={{ backgroundColor: 'green' }}
                        />
                }
            </Box>
        </Box>
    );
}

export default ProfessionalInformation;
