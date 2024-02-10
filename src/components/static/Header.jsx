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
import Logo from  "./Logo"

import { useBoundStore } from "../../utils/stores/boundStore";
import { useAuth } from '../../hooks/AuthProvider';

export default function Header() {
  const { regenerateText, hideElements } = useBoundStore()
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
      opacity: hideElements ? "0" : "1",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Logo />
        <Typography
          fontFamily="League Spartan"
          fontSize="2rem"
          variant='h6'
          sx={{
            ml: 1,
            mr: 2,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => regenerateText()}
        >typefast_</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Link href='/'  tabIndex={-1}>
            <IconButton
              aria-label="start-type-test"
              tabIndex={-1}
            >
              <KeyboardIcon style={{ m: 0, p: 0 }} />
            </IconButton>
          </Link>

          <Link href='/games'  tabIndex={-1}>
            <IconButton
              aria-label="multiplayer"
              tabIndex={-1}
            >
              <VideogameAssetIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>


          <Link href='/leaderboard' tabIndex={-1}>
            <IconButton
              aria-label="leaderboard"
              tabIndex={-1}
            >
              <LeaderboardIcon style={{ m: 0, p: 0, }}  tabIndex={-1}/>
            </IconButton>
          </Link>

          <Link href='/about'  tabIndex={-1}>
            <IconButton
              aria-label="information"
              tabIndex={-1}

            >
              <InfoIcon style={{ m: 0, p: 0, }} />
            </IconButton>
          </Link>

          <Link href='/settings'  tabIndex={-1}>
            <IconButton aria-label="settings"  tabIndex={-1}>
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
        <IconButton aria-label="notifications"  tabIndex={-1}>
          <NotificationsNoneIcon style={{ m: 0, p: 0, }} />
        </IconButton>
        <Link href={isLoggedIn ? '/account' : "/login"}  tabIndex={-1}>
          <IconButton aria-label="profile" tabIndex={-1}
>
          <PersonOutlineIcon style={{ m: 0, p: 0, }} />
        </IconButton>
        </Link>
      </Stack>

    </Box>
  )
}
