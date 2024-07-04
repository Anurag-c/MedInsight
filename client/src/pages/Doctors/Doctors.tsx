import { Box, Typography } from "@mui/material";
import { Helper } from "../../services/helper";
import Search from "../../components/doctors/Search";
import Doctor from "../../components/doctors/Doctor";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<{}[]>([]);
    
    const onSearch = (payload: any) => {
        Helper.getDoctors(payload.searchText, payload.treatsCovid, payload.specialities).then((result: any) => setDoctors(result));
    }

    const goToDoctor = (doctor: any) => {
        navigate(`/app/doctors/${doctor.id}`)
    }

    useEffect(() => {
        Helper.getDoctors(null, null, null).then((result: any) => setDoctors(result));
    }, []);

    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
            { user.role === 'patient' && <Search onSearch={onSearch} /> }
            { user.role === 'insurer' && <Typography variant="h5" fontWeight={600} color={'primary'}>Doctors</Typography> }
            <Box>
                <Typography variant="h5" fontWeight={600} color={'primary'}>Available Doctors</Typography>
                <Typography variant="body2" color={'textSecondary'}>Showing {doctors.length} doctors</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={3}>
                {
                    doctors.map((doctor: any, index: any) => (
                        <Doctor key={index} doctor={doctor} onClick={goToDoctor} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default Doctors;
