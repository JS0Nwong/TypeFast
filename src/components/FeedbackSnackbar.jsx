import { Snackbar, Slide } from '@mui/material'
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
            message={snackbarMessage}
            open={!!snackbarMessage}
            autoHideDuration={3000}
            onClose={() => setSnackbar("")}
        />
    )
}
