import { useContext, useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";
import PersonalInformation from "../../components/settings/PersonalInformation";
import MedicalInformation from "../../components/settings/MedicalInformation";
import ProfessionalInformation from "../../components/settings/ProfessionalInformation";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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

const Settings = () => {
    const auth = useContext(AuthContext);
    const [tabs, setTabs] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(1);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }

    useEffect(() => {
        const result = Helper.getTabsByRole(auth?.authState?.user?.role);
        setTabs(result);
        setSelectedTab(result[0].id);
    }, [])

    const selectedTabPanel = selectedTab === 1 ? <PersonalInformation /> : selectedTab === 2 ? <MedicalInformation /> : <ProfessionalInformation />;

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} mb={4}>Settings & Customization</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Settings tabs">
                    {
                        tabs.length && tabs.map(tab => <Tab key={tab?.id} label={tab?.label} value={tab?.id} {...a11yProps(tab?.id)} />)
                    }
                </Tabs>
            </Box>
            <Box>
                {
                    tabs.length && tabs.map(tab => (
                        <CustomTabPanel key={tab.id} value={selectedTab} index={tab.id}>
                            {selectedTabPanel}
                        </CustomTabPanel>
                    ))
                }
            </Box>
        </Box>
    );
}

export default Settings;