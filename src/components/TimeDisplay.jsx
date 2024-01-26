import { useContext } from 'react'
import { Box, Typography } from "@mui/material"
import useStore from '../utils/store';
import { ThemeContext } from '../hooks/useTheme';
import useCountdown from '../hooks/useCountdown';

export default function TimeDisplay() {
  const { time, gameStatus, updateTimer, endGame } = useStore()
  const { theme } = useContext(ThemeContext)

  useCountdown(() => {
    if(time > 0) {
        updateTimer()
    } 
    else {
      endGame()
    }
  }, gameStatus === 'ready' ? 1000 : null)

  return (
    <>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        p: 1,
        borderRadius: "4px",
        background: theme.palette.background.main,
      }}>
        <Typography>
          {time >= 60 ? Math.floor(time / 60) + ":" + (time % 60 > 9 ? time % 60 : "0" + time % 60) : "0:" + (time % 60 > 9 ? time % 60 : "0" + time % 60)}
        </Typography>
      </Box>
    </>
  )
}
