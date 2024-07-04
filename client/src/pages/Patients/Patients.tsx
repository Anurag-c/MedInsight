import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";
import Patient from "../../components/patients/Patient";

const Patients = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [patients, setPatients] = useState<{}[]>([]);

    useEffect(() => {
        const result = Helper.getAllPatients();
        setPatients(result);
    }, [])
    return (
        <Box>
            <Typography variant="h5" fontWeight={'semibold'} color="primary">{ user.role === 'doctor' ? 'Patients' : 'Members' }</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={3} mt={3}>
                {
                    patients.length && patients.map((patient: any) => (
                        <Patient patient={patient} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default Patients;
