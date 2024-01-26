import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Link,
} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import ThemeSelect from '../ThemeSelect';
import FontSelect from '../FontSelect';

import useStore from '../../utils/store';
import { useAuth } from '../../hooks/AuthProvider';

export default function Header() {
  const handleMenuOpen = (e) => {
    setAnchor(e.currentTarget)
  }

  const { regenerateText, hideElements } = useStore()
  const { isLoggedIn } = useAuth()

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      mt: 4,
      transition: "0.35s ease",
      opacity: hideElements ? "0" : "1"
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
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => regenerateText()}
        >type.fast</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Link href='/'>
            <IconButton
              aria-label="start-type-test"
              tabIndex={0}
            >
              <KeyboardIcon style={{ m: 0, p: 0 }} />
            </IconButton>
          </Link>

          <Link href='/games'>
            <IconButton
              aria-label="multiplayer"
              tabIndex={1}
            >
              <VideogameAssetIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>


          <Link href='/leaderboard'>
            <IconButton
              aria-label="leaderboard"
              tabIndex={1}
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
        <IconButton aria-label="notifications">
          <NotificationsNoneIcon style={{ m: 0, p: 0, }} />
        </IconButton>
        <Link href={isLoggedIn ? '/account' : "/login"}>
        <IconButton  aria-label="profile">
          <PersonOutlineIcon style={{ m: 0, p: 0, }} />
        </IconButton>
        </Link>
      </Stack>

    </Box>
  )
}
