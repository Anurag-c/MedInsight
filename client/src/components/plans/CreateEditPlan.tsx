import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText, 
    TextField, Box, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";

export interface CreateEditPlanProps {
    open: boolean;
    type: string;
    plan: any;
    onClose: (value?: any) => void;
}

const CreateEditPlan = (props: CreateEditPlanProps) => {
    const { onClose, plan, open, type } = props;
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    const handleClose = (plan: any) => {
        onClose(plan);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value, checked } = e.target;
        const newValues = { ...selectedPlan, [name]: name === 'isActive' ? checked as Boolean : value };
        setSelectedPlan(newValues);
    }

    useEffect(() => {
        if (plan && type !== 'create') {
            type === 'view' ? setSelectedPlan(plan.plans) : setSelectedPlan(plan);
        } else {
            setSelectedPlan(null);
        }
    }, [plan]);

    return (
        <Dialog open={open} onClose={() => handleClose(null)} fullWidth maxWidth={'sm'}>
            {type !== 'view' && <DialogTitle>{type === 'edit' ? 'Edit Plan' : 'Create Plan'}</DialogTitle>}
            <DialogContent>
                <Box>
                    <DialogContentText mb={1}>Plan Name</DialogContentText>
                    <TextField 
                        id="planName"
                        name="planName"
                        fullWidth
                        disabled={type === 'view'}
                        placeholder="Enter a plan name"
                        variant="outlined" 
                        value={selectedPlan?.planName ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    />
                </Box>
                <Box mt={1}>
                    <DialogContentText mb={1}>Plan Description</DialogContentText>
                    <TextField 
                        id="planDescription"
                        name="planDescription"
                        fullWidth
                        disabled={type === 'view'}
                        placeholder="Enter the plan description"
                        variant="outlined" 
                        value={selectedPlan?.planDescription ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    />
                </Box>
                <Box mt={1}>
                    <DialogContentText mb={1}>Premium</DialogContentText>
                    <TextField 
                        id="premiumCost"
                        name="premiumCost"
                        fullWidth
                        disabled={type === 'view'}
                        placeholder="Enter the plan premium"
                        variant="outlined" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        value={selectedPlan?.premiumCost ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {
                    type === 'view' ? 
                        <Button onClick={() => handleClose(null)}>Close</Button>
                    :
                        <>
                            <Button onClick={() => handleClose(null)}>Cancel</Button>
                            <Button disabled={!selectedPlan?.planName || !selectedPlan?.premiumCost} onClick={() => handleClose(selectedPlan)}>{ type === 'edit' ? 'Update' : 'Save' }</Button>
                        </>
                }
            </DialogActions>
        </Dialog>
    );
}

export default CreateEditPlan;