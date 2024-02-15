import { Box, Typography } from "@mui/material"
import { useBoundStore } from "../utils/stores/boundStore";
import useCountdown from '../hooks/useCountdown';

export default function TimeDisplay() {
  const {
    customTime,
    time,
    gameStatus,
    updateTimer,
    endGame
  } = useBoundStore((state) => ({
    customTime: state.customTime,
    time: state.time,
    gameStatus: state.gameStatus,
    updateTimer: state.updateTimer,
    endGame: state.endGame,
  }))

  useCountdown(() => {
    if (time > 0) {
      updateTimer()
    }
    else {
      endGame()
    }
  }, gameStatus === 'ready' ? 1000 : null)

  return (
    <>
      <Box sx={{
        position: 'relative',
        top: 0,
        left: 0,
        borderRadius: "4px",
        opacity: gameStatus === 'ready' ? "1" : "0",
        transition: "0.15s ease"
      }}>
        <Typography fontSize="1.3rem" fontFamily='League Spartan' fontWeight="500">
          {time >= 60
            ? Math.floor(time / 60) + ":" + (time % 60 > 9 ? time % 60 : "0" + time % 60)
            : "0:" + (time % 60 > 9 ? time % 60 : "0" + time % 60)}
        </Typography>
      </Box>
    </>
  )
}
