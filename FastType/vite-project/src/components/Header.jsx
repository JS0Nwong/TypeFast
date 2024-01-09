import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Link,
  Menu,
  MenuItem,
} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import ThemeSelect from './ThemeSelect';
import FontSelect from './FontSelect';
import { useGame } from '../hooks/useGame';

export default function Header() {
  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)
  const handleMenuOpen = (e) => {
    setAnchor(e.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchor(null)
  }

  const { restartGame } = useGame()

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      mt: 5
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography
          fontSize="2rem"
          variant='h6'
          sx={{
            mr: 2,
            cursor: 'pointer'
          }}
        >type.fast</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <IconButton
            aria-label="start-type-test"
            onClick={handleMenuOpen}
          >
            <KeyboardIcon style={{ m: 0, p: 0 }} />
          </IconButton>

          <Link href='/leaderboard'>
            <IconButton
              aria-label="leaderboard"
            >
              <LeaderboardIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>

          <Link href='/about'>
            <IconButton
              aria-label="information"
            >
              <InfoIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>

          <Link href='/settings'>
            <IconButton aria-label="settings">
              <SettingsIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>

        </Stack>
      </Box>

      <Stack
        direction="row"
        spacing={2}
      >
        <ThemeSelect />
        <FontSelect />
        <IconButton>
          <NotificationsNoneIcon style={{ m: 0, p: 0, }} />
        </IconButton>
        <IconButton>
          <PersonOutlineIcon style={{ m: 0, p: 0, }} />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleMenuClose}
      >
        <Link href='/'>
          <MenuItem>singleplayer</MenuItem>
        </Link>
        <Link href='/games'>
          <MenuItem>multiplayer</MenuItem>
        </Link>
      </Menu>


    </Box>
  )
}
