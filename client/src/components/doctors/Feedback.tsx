import { Box, Card, CardActions, CardContent, Typography, Rating, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Feedback = ({ feedback, onEditFeedback }: { feedback: any, onEditFeedback?: (feedback: any) => void }) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState?.user.token ? auth.authState?.user?.user : auth?.authState?.user;

    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef85'} p={1} borderRadius={'50%'} mr={5}>
                <PersonIcon fontSize="medium" color={'primary'}></PersonIcon>
            </Box>
            <CardContent>
                <Typography variant="body1">{feedback.name}</Typography>
                <Typography variant="body2" my={1}>{feedback.review}</Typography>
                <Rating name="read-only" value={feedback.rating} size="small" readOnly />
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                { user.id === feedback.patientId && onEditFeedback && <IconButton size="small" color="primary" onClick={() => onEditFeedback(feedback)}>
                        <EditIcon fontSize="small" />
                    </IconButton> }
            </CardActions>
        </Card>
    );
}

export default Feedback;