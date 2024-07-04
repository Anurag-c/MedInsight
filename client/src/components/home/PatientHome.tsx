import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import CreateEditPlan from "../plans/CreateEditPlan";

const PatientHome = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth.authState.user.user : auth?.authState.user;
    const theme = useThemeContext();
    const primary = theme?.currentTheme?.palette.primary;
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    const toggleOpen = (plan: any) => {
        setSelectedPlan(plan);
        setOpen(open => !open);
    }

    return (
        <Box>
            <Typography variant="h6" color={'primary'} fontWeight={600}>My Insurance Plans</Typography>
            { !user?.purchasedPlans.length ? <Typography variant="body1">You have no purchased plans. Look for an insurer and purchase now.</Typography> : (
                <Box mt={2} display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
                    { user?.purchasedPlans.map((plan: any) => (
                        <Box key={plan.id} p={2} border={1} borderRadius={4} borderColor={primary.main} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="body1" fontWeight={500} mr={1}>{plan.plans.planName}</Typography>
                            <Button size="small" onClick={() => toggleOpen(plan)}>View</Button>
                        </Box>
                    )) }
                </Box>
            ) }
            <CreateEditPlan open={open} onClose={() => toggleOpen(null)} plan={selectedPlan} type={'view'} />
        </Box>
    );
}

export default PatientHome;