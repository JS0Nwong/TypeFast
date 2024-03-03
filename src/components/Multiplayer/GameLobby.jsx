import { Box, Typography } from '@mui/material'
import { auth } from '../../configs/firebase'
import LockIcon from '@mui/icons-material/Lock';

import LobbyPlayerList from './LobbyPlayerList'
import LobbyGameOptions from './LobbyGameOptions'
import LobbyPlayerOptions from './LobbyPlayerOptions'

import { useBoundStore } from '../../utils/stores/boundStore'
import { useNavigate, useSearchParams } from 'react-router-dom'


export default function GameLobby() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('room')
  
  const { currentLobbyInfo } = useBoundStore()

  if (!currentLobbyInfo) return null
  if(currentLobbyInfo.gameStatus === "in-progress") return null
  if(currentLobbyInfo.gameStatus === "finished") return null
  if (currentLobbyInfo.gameStatus === 'starting') navigate("/mpgame?room=" + id);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: "column",
      width: '100%',
      mt: 5,
      height: "100%",
    }}>
      <Typography variant="h6"
        sx={{ display: 'flex', alignItems: 'center' }}>
        Players
        ({currentLobbyInfo.players.length}/{currentLobbyInfo.maxPlayers})
        {!currentLobbyInfo.roomPrivacy ? <LockIcon style={{ marginLeft: '0.3rem' }} /> : <></>}
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
