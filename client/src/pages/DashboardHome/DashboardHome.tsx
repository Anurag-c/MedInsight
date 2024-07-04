import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Box, Card, Typography } from "@mui/material";
import PatientHome from "../../components/home/PatientHome";
import { Helper } from "../../services/helper";
import DoctorHome from "../../components/home/DoctorHome";

const DashboardHome = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
    const [plansLength, setPlansLength] = useState(null);

    useEffect(() => {
        user?.role === 'insurer' && Helper.getAllPlans().then((plans) => {
            setPlansLength(plans.length);
        });
    }, []);

    return (
        <Box>
            { user?.role === 'patient' && <PatientHome /> }
            { user?.role === 'doctor' && <DoctorHome /> }
            { user?.role === 'insurer' && (
                <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={600} color="primary" textAlign={'center'}>Available Plans</Typography>
                    <Typography variant="h6" fontWeight={600} color="primary" textAlign={'center'}>{plansLength}</Typography>
                </Card>
            ) }
        </Box>
    );
}

export default DashboardHome;
