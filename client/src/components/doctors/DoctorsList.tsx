import { Box } from "@mui/material"
import Doctor from "./Doctor";

const DoctorsList = ({ doctors }: { doctors: any }) => {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            {
                doctors.map((doctor: any, index: any) => (
                    <Doctor key={index} doctor={doctor} onClick={() => {
                        console.log("Clicked on doctor:", doctor);
                    }}/>
                ))
            }
        </Box>
    );
}

export default DoctorsList;
