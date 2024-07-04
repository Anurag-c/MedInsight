import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export interface CreateEditFeedbackProps {
    open: boolean;
    type: string;
    feedback: any;
    onClose: (value?: any) => void;
}

const CreateEditFeedback = ({ open, type, feedback, onClose }: CreateEditFeedbackProps) => {
    const [selectedFeedback, setSelectedFeedback] = useState<any>({
        rating: null,
        review: ''
    });
    const handleClose = (feedback: any) => {
        onClose(feedback);
    }

    useEffect(() => {
        setSelectedFeedback(feedback);

        return () => {
            setSelectedFeedback(null);
        }
    }, [feedback])
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
            <DialogTitle>{type === 'edit' ? 'Edit Feedback' : 'Add Feedback'}</DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
                    <Rating
                        name="rating"
                        value={selectedFeedback?.rating || 0}
                        onChange={(event, newValue) => {
                            setSelectedFeedback({ ...selectedFeedback, rating: newValue });
                        }}
                    />
                    <TextField
                        id="rating"
                        name="rating"
                        label="Review"
                        multiline
                        fullWidth
                        rows={2}
                        value={selectedFeedback?.review || ''}
                        onChange={(e) => {
                            setSelectedFeedback({ ...selectedFeedback, review: e.target.value });
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {
                    type === 'view' ? 
                        <Button onClick={handleClose}>Close</Button>
                    :
                        <>
                            <Button onClick={() => handleClose(null)}>Cancel</Button>
                            <Button onClick={() => handleClose(selectedFeedback)}>{ type === 'edit' ? 'Update' : 'Save' }</Button>
                        </>
                }
            </DialogActions>
        </Dialog>
    );
}

export default CreateEditFeedback;