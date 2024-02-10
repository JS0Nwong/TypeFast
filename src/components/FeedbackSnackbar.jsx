import { Snackbar, Slide } from '@mui/material'
import useStore from '../utils/stores/store';
// import Fade from '@mui/material/Fade';

export default function FeedbackSnackbar() {
    const { snackbarMessage, setSnackbar } = useStore();
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            message={snackbarMessage}
            open={!!snackbarMessage}
            autoHideDuration={3000}
            TransitionComponent={Slide}
            onClose={() => setSnackbar("")}
        />
    )
}
