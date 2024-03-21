import { Snackbar, Slide, Alert } from '@mui/material'
import { useBoundStore } from '../utils/stores/boundStore';
// import Fade from '@mui/material/Fade';

export default function FeedbackSnackbar() {
    const { snackbarMessage, setSnackbar } = useBoundStore();
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={!!snackbarMessage}
            autoHideDuration={3000}
            onClose={() => setSnackbar("")}
            sx={{
                width: "700px"
            }}
        >
            <Alert
                severity="success"
                onClose={() => setSnackbar("")}
                sx={{
                    width: 'fit-content'
                }}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    )
}
