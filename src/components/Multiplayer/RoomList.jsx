import { Box } from "@mui/material"
import MPGameInfo from "./MPGameInfo"

export default function RoomList() {
  return (
    <Box sx={{
        height: "550px", 
        overflowY: "auto", 
        mt: 5, 
        maxHeight: "100%",
    }}>
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />
        <MPGameInfo />

    </Box>
  )
}
