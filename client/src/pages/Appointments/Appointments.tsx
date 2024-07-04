import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabPanelProps } from "../Settings/Settings";
import Appointment from "../../components/appointments/Appointment";
import CreateEditFeedback from "../../components/doctors/CreateEditFeedback";
import { Helper } from "../../services/helper";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

const Appointments = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user.token ? auth?.authState?.user?.user : auth?.authState?.user;
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1);
    const [appointments, setAppointments] = useState<{}[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('create');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }

    const handleCancelAppointment = async (appointment: any) => {
        Helper.cancelAppointment(appointment.id).then((res: any) => {
            getAllAppointments();
        })
    }

    const getAllAppointments = () => {
        Helper.getAllAppointments().then(async (res) => {
            const finalList = res.data.data.data.filter((item: any) => item.isBooked);
            setAppointments(finalList);
        }).catch((err) => console.log(err))
    }

    const handleAddFeedback = (appointment: any) => {
        setDialogType('create');
        setSelectedAppointment(appointment);
        setDialogOpen(open => !open);
    }

    const handleDialogClose = async (feedback: any) => {
        if (!feedback) {
            setDialogOpen(false);
            setSelectedFeedback(null);
        } else {
            await createFeedback(feedback);
            setDialogOpen(false);
            setSelectedFeedback(null);
        }
    }

    const createFeedback = async (feedback: any) => {
        if (!selectedAppointment) {
            return;
        }
        const payload = {
            doctorId: selectedAppointment?.doctorId,
            ...feedback
        }
        const res = await Helper.createFeedback(payload);

        if (res) {
            getAllAppointments();
        }
    }

    const handleMessengerClick = (appointment: any) => {
        if (!appointment) {
            return;
        }
        navigate('/app/messenger', { state: { userId: appointment?.doctorId }});
    }

    useEffect(() => {
        getAllAppointments();
    }, []);
    return (
        <Box>
            <Typography variant="h5" fontWeight={'semibold'} color="primary">Appointments</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={3}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Settings tabs">
                    <Tab label="All" value={1} {...a11yProps(1)} />
                    <Tab label="Upcoming" value={2} {...a11yProps(2)} />
                    <Tab label="Expired" value={3} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel value={selectedTab} index={1}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            !appointments.length && <Typography variant="body1">You have no appointments.</Typography>
                        }
                        {
                            appointments.map((appointment: any) => (
                                <Appointment key={appointment.id} appointment={appointment} onCancel={handleCancelAppointment} onAddFeedback={handleAddFeedback} onMessage={handleMessengerClick} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={2}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            !appointments.length && <Typography variant="body1">You have no appointments.</Typography>
                        }
                        {
                            appointments.filter(((item: any) => !item.isComplete)).map((appointment: any) => (
                                <Appointment key={appointment.id} appointment={appointment} onCancel={handleCancelAppointment} onAddFeedback={handleAddFeedback} onMessage={handleMessengerClick} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={3}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            !appointments.length && <Typography variant="body1">You have no appointments.</Typography>
                        }
                        {
                            appointments.filter(((item: any) => item.isComplete)).map((appointment: any) => (
                                <Appointment key={appointment.id} appointment={appointment} onCancel={handleCancelAppointment} onAddFeedback={handleAddFeedback} onMessage={handleMessengerClick} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
            </Box>
            <CreateEditFeedback feedback={selectedFeedback} open={dialogOpen} onClose={handleDialogClose} type={dialogType} />
        </Box>
    );
}

export default Appointments;