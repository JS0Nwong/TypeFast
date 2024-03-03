import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import MPGameInfo from "./MPGameInfo"
import { useBoundStore } from "../../utils/stores/boundStore"

export default function RoomList() {
  const {
    currentLobbies,
    fetchCurrentLobbies,
  } = useBoundStore()

  useEffect(() => {
    // Fetch the current lobbies
    fetchCurrentLobbies()
  }, [])

  return (
    <Box sx={{
      height: "550px",
      overflowY: "auto",
      mt: 5,
      maxHeight: "100%",
    }}>
      {currentLobbies.length !== 0
        ? currentLobbies.map((lobby, index) => (
          <MPGameInfo
            key={index}
            lobby={lobby}
          />
        ))
        : <Typography
          variant="h6"
          sx={{
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>No games found
        </Typography>}
    </Box>
  )
}
