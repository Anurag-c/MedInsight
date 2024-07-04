import { Card, CardActions, Box, CardContent, Typography, Button, IconButton } from "@mui/material";
import MedicalInformation from "@mui/icons-material/MedicalInformation";
import CheckIcon from '@mui/icons-material/Check';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ChatIcon from '@mui/icons-material/Chat';

export interface InsurerProps {
    insurer: any,
    onViewPlans: (insurer: any) => void,
    onSubscribe: (insurer: any) => void,
    onMessage?: (insurer: any) => void
}

const Insurer = ({ insurer, onViewPlans, onSubscribe, onMessage }: InsurerProps) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth?.authState.user.user : auth?.authState.user;
    const isSubscribed = user.subscribedProviders.find((item: any) => item.providerId === insurer.insurancePlans[0]?.providerId);
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4, paddingY: 2 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef85'} p={1} borderRadius={'50%'} mr={5}>
                <MedicalInformation fontSize="large" color={'primary'}></MedicalInformation>
            </Box>
            <CardContent>
                <Box>
                    <Typography variant="body1">{insurer?.providerName}</Typography>
                    <Typography variant="body2">Available Health Plans: {insurer.insurancePlans.length}</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    { user?.role === 'patient' && onMessage && <IconButton sx={{ p: 1 }} size="small" color="primary" onClick={() => onMessage(insurer)}>
                        <ChatIcon fontSize='small' />
                    </IconButton>}
                    <Button size="small" variant="contained" disableElevation color="primary" disabled={!insurer.insurancePlans.length} onClick={() => onViewPlans(insurer)}>View Plans {insurer.insurancePlans.length > 0 && `(${insurer.insurancePlans.length})`}</Button>
                    <Button size="small" variant={isSubscribed ? 'text' : 'contained'} disabled={isSubscribed} startIcon={isSubscribed && <CheckIcon />} disableElevation color="primary" onClick={() => onSubscribe(insurer)}>{ isSubscribed ? 'Subscribed' : 'Subscribe'}</Button>
                </Box>
            </CardActions>
        </Card>
    );
}

export default Insurer;