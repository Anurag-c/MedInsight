import { Box, Button, Typography, Tabs, Tab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { TabPanelProps } from "../Settings/Settings";
import { useContext, useEffect, useState } from "react";
import Plan from "../../components/plans/Plan";
import { Helper } from "../../services/helper";
import CreateEditPlan from "../../components/plans/CreateEditPlan";
import AuthContext from "../../contexts/AuthContext";

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Plans = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [open, setOpen] = useState(false);
    const [allPlans, setAllPlans] = useState<{}[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [dialogType, setDialogType] = useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }
    const handleClose = async (plan: any) => {
        if (!plan) {
            setOpen(false);
            setSelectedPlan(null);
        } else {
            !plan.id ? await createPlan(plan) : await editPlan(plan);
            setOpen(false);
            setSelectedPlan(null);
        }
    }
    const handleCreatePlan = (plan: any) => {
        setDialogType('create');
        setSelectedPlan(plan);
        setOpen(open => !open);
    }

    const handleEditPlan = (plan: any) => {
        setDialogType('edit');
        setSelectedPlan(plan);
        setOpen(open => !open);
    }

    const handleViewPlan = (plan: any) => {
        setDialogType('view');
        setSelectedPlan(plan);
        setOpen(open => !open);
    }

    const handleDeletePlan = (plan: any) => {
        Helper.deletePlan(plan.id).then(() => {
            const index = allPlans.findIndex((item: any) => item.id === plan.id);
            const newValues = [...allPlans.slice(0, index), ...allPlans.slice(index + 1)];
            setAllPlans(newValues);
        });
    }

    const createPlan = async (plan: any) => {
        const newPlan = { ...plan, providerData: { name: user?.name } };
        const res = await Helper.createPlan(newPlan);
        if (res) {
            setAllPlans([...allPlans, res]);
        }
    }

    const editPlan = async (plan: any) => {
        const index = allPlans.findIndex((item: any) => item.id === plan.id);
        const updatedPlan = { ...allPlans[index], ...plan };
        const res = await Helper.editPlan(updatedPlan);
        if (res) {
            const newValues = [...allPlans.slice(0, index), res, ...allPlans.slice(index + 1)];
            setAllPlans(newValues);
        }
    }

    useEffect(() => {
        Helper.getAllPlans().then((plans) => {
            setAllPlans(plans);
        });
    }, [])
    return (
        <Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h5" fontWeight={'semibold'} color="primary">All Plans</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreatePlan}>
                    Create Plan
                </Button>
                <CreateEditPlan open={open} onClose={handleClose} plan={selectedPlan} type={dialogType} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={3}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Settings tabs">
                    <Tab label="All" value={1} {...a11yProps(1)} />
                    <Tab label="Active" value={2} {...a11yProps(2)} />
                    <Tab label="Inactive" value={3} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel value={selectedTab} index={1}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.map((plan: any) => (
                                <Plan key={plan.id} plan={plan} onPlanView={handleViewPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={2}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.filter(((item: any) => item.isActive)).map((plan: any) => (
                                <Plan key={plan.id} plan={plan} onPlanView={handleViewPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={3}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.filter(((item: any) => !item.isActive)).map((plan: any) => (
                                <Plan key={plan.id} plan={plan} onPlanView={handleViewPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}

export default Plans;