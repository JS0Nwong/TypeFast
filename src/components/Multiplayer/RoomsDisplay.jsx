import { Box } from "@mui/material"

import RoomList from './RoomList'
import MultiplayerMenuBar from './MultiplayerMenuBar'
import FeedbackSnackbar from '../FeedbackSnackbar'

export default function RoomsDisplay() {
    return (
        <Box sx={{
            height: '100%',
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: 9,
        }}>
            <MultiplayerMenuBar />
            <RoomList />
            <FeedbackSnackbar />
        </Box>
    )
}
