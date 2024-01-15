import { useContext } from 'react'
import { Box, Typography } from "@mui/material"
import useStore from '../utils/store';
import { ThemeContext } from '../hooks/useTheme';

export default function TimeDisplay() {
  const { time } = useStore()
  const { theme } = useContext(ThemeContext)
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
          {time >= 60 ? time / 60 + ":" + time % 60 + time % 60 : "0:" + time}
        </Typography>
      </Box>
    </>
  )
}
