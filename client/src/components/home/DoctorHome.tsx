import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Feedback from "../doctors/Feedback";

const DoctorHome = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
    return (
        <Box>
            <Typography variant="h6" color={'primary'} fontWeight={600}>Patient Reviews</Typography>
            <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>
                { !user?.feedbacksRecieved.length ? <Typography variant="body1">You have no patient reviews</Typography> : (
                    <>
                        { user?.feedbacksRecieved.map((feed: any) => (
                            <Feedback key={feed.id} feedback={feed} />
                        )) }
                    </>
                )}
            </Box>
        </Box>
    );
}

export default DoctorHome;