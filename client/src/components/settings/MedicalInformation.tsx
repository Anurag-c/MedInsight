import { Box, TextField, Typography, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";

const MedicalInformation = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState?.user.token ? auth?.authState?.user?.user : auth?.authState?.user;
    const [userMedicalForm, setUserMedicalForm] = useState({
        medicalHistory: user?.medicalHistory,
        covid19Symptoms: {
            fever: user?.covid19Symptoms?.fever,
            cough: user?.covid19Symptoms?.cough
        }
    });
    const [submitted, setSubmitted] = useState(false);
    const [submittedFailed, setSubmittedFailed] = useState(false);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        const newValues = name === 'fever' || name === 'cough' ?
            { ...userMedicalForm, covid19Symptoms: { ...userMedicalForm?.covid19Symptoms, [name]: value === 'false' ? false : true } } :
            { ...userMedicalForm, [name]: value };
        setUserMedicalForm(newValues);
    }

    const handleCloseSnackbar = () => {
        setSubmitted(false);
    }

    const onSubmit = () => {
        const payload = { ...userMedicalForm };
        Helper.updateUserByRole(payload, user?.role).then((res) => {
            setSubmitted(true);
            const oldUserData = JSON.parse(localStorage.getItem('user') || '{}');
            const newUserData = { ...oldUserData, user: { ...oldUserData.user, ...res }};
            localStorage.setItem('user', JSON.stringify(newUserData));
            auth?.dispatch({
                type: 'LOGIN',
                payload: {
                    user: newUserData
                }
            });
            setSubmittedFailed(false);
        }).catch((err) => {
            console.log("Error:", err);
            setSubmittedFailed(true);
        });
    }

    return (
        <Box component={'form'} noValidate autoComplete="off">
            <Box>
                <Typography variant="subtitle1" mb={1}>Medical History</Typography>
                <TextField
                    id="medicalHistory"
                    name="medicalHistory"
                    placeholder="Please provide your medical history, including any pre-existing conditions, allergies, and relevant information. This will help us better understand your health needs."
                    multiline
                    fullWidth
                    rows={4}
                    value={userMedicalForm?.medicalHistory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
            </Box>
            <Box minWidth={350} mt={2}>
                <FormControl>
                    <FormLabel id="covid19Symptoms-fever">Have you had a sudden or prolonged period of fever in the last few days?</FormLabel>
                    <RadioGroup
                        aria-labelledby="covid19Symptoms-fever"
                        name="fever"
                        row
                        value={userMedicalForm?.covid19Symptoms?.fever}
                        onChange={(e: any) => handleValueChange(e)}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box minWidth={350} mt={2}>
                <FormControl>
                    <FormLabel id="covid19Symptoms-cough">Have you been experiencing cough symptoms?</FormLabel>
                    <RadioGroup
                        aria-labelledby="covid19Symptoms-cough"
                        name="cough"
                        row
                        value={userMedicalForm?.covid19Symptoms?.cough}
                        onChange={(e: any) => handleValueChange(e)}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
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

export default MedicalInformation;
