import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";
import CreateEditPlan from "../../components/plans/CreateEditPlan";
import Plan from "../../components/plans/Plan";
import { useThemeContext } from "../../contexts/ThemeContext";

const Insurances = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
    const theme = useThemeContext();
    const primary = theme?.currentTheme?.palette.primary;
    const { insurerId } = useParams<any>();
    const [insurer, setInsurer] = useState<any>(null);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handlePlanSubscribe = async (plan: any) => {
        const res = await Helper.buyPlan(plan.id);
        if (res) {
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

    const handlePlanAccept = (plan: any) => {
        console.log('Accept Plan', plan);
    }

    const getProviderById = async () => {
        const res = await Helper.getProviderById(insurerId);

        if (res) {
            setInsurer(res);
        }
    }

    const handlePlanView = (plan: any) => {
        setSelectedPlan(plan);
        setDialogOpen(open => !open);
    }

    const handleClose = (plan: any) => {
        console.log('here')
        if (!plan) {
            setDialogOpen(false);
            setSelectedPlan(null);
        }
    }

    useEffect(() => {
        getProviderById();
    }, []);

    return (
        <Box>
            <Box p={2} border={1} borderRadius={4} borderColor={primary.main} mb={3}>
                <Typography variant="h6" color={'primary'} fontWeight={600}>{insurer?.providerName}</Typography>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                    <Typography variant="body1" fontWeight={500}>Available Plans: {insurer?.insurancePlans.length}</Typography>
                </Box>
            </Box>
            <Typography variant="h5" color={'primary'} mb={1}>Available Plans</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={3} mt={3}>
                {
                    insurer?.insurancePlans.map((plan: any) => (
                        <Plan key={plan.id} plan={plan} onPlanSubscribe={handlePlanSubscribe} onPlanAccept={handlePlanAccept} onPlanView={handlePlanView} />
                    ))
                }
            </Box>
            <CreateEditPlan open={dialogOpen} type="view" onClose={handleClose} plan={selectedPlan} />
        </Box>
    );
}

export default Insurances;
