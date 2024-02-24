import { Box, Typography } from '@mui/material'
import LobbyPlayerList from './LobbyPlayerList'
import LobbyGameOptions from './LobbyGameOptions'
import LobbyPlayerOptions from './LobbyPlayerOptions'
import { auth } from '../../configs/firebase'

import { useBoundStore } from '../../utils/stores/boundStore'

export default function GameLobby() {
  const { currentLobbyInfo } = useBoundStore()

  if (!currentLobbyInfo) return null
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: "column",
      width: '100%',
      mt: 5,
      height: "100%",
    }}>
      <Typography variant="h6">
        Players 
        ({currentLobbyInfo.players.length}/{currentLobbyInfo.maxPlayers})
      </Typography>
      <LobbyPlayerList data={currentLobbyInfo} />

      {currentLobbyInfo.roomOwner === auth.currentUser.uid
        ? <>
          <Typography variant="h6">Game Options</Typography>
          <LobbyGameOptions />
        </>
        : <LobbyPlayerOptions />}
    </Box>
  )
}
