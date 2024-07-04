import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helper } from "../../services/helper";
import Insurer from "../../components/insurer/Insurer";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const Insurers = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
    const [insurers, setInsurers] = useState<{}[]>([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const getAllInsurers = async () => {
        const res = await Helper.getAllInsurers();
        setInsurers(res);
    }

    const handleViewPlans = (insurer: any) => {
        navigate(`/app/insurers/${insurer.id}`)
    }

    const handleSubscribe = async (insurer: any) => {
        const res = await Helper.subscribeProvider(insurer.id);

        if (res) {
            setOpen(true);
            const roleData = await Helper.getUserByRole(user?.role);
            const oldUserData = JSON.parse(localStorage.getItem('user') || '{}');
            const newUserData = { ...oldUserData, user: { ...oldUserData.user, ...roleData }};
            localStorage.setItem('user', JSON.stringify(newUserData));
            localStorage.removeItem('userLoginInfo');
            auth?.dispatch({
                type: 'LOGIN',
                payload: newUserData
            });
        }
    }

    const handleMessengerClick = (insurer: any) => {
        if (!insurer.id) {
            return;
        }
        navigate('/app/messenger', { state: { userId: insurer.id } });
    }

    useEffect(() => {
        getAllInsurers();
    }, [])
    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
            <Typography variant="h5" fontWeight={600} color={'primary'}>Insurers</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={3}>
                {
                    insurers.map((insurer: any) => (
                        <Insurer insurer={insurer} onViewPlans={handleViewPlans} onSubscribe={handleSubscribe} onMessage={handleMessengerClick} />
                    ))
                }
            </Box>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Subscribed successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Insurers;