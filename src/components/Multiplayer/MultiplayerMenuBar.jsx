import { useState, useContext } from 'react'
import { Box, Stack, styled, Divider, Button } from '@mui/material'
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import AddIcon from '@mui/icons-material/Add';
import NumbersIcon from '@mui/icons-material/Numbers';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TitleIcon from '@mui/icons-material/Title';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import CreateGameDialog from './CreateGame';
import { useBoundStore } from '../../utils/stores/boundStore';
import AuthContext from '../../hooks/AuthProvider';

export default function MultiplayerMenuBar() {
  const MenuBox = styled("div", {
    name: "MuiDiv",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;

  const { isLoggedIn } = useContext(AuthContext)

  const {
    mode,
    setMode,
    hideElements,
  } = useBoundStore((state) => ({
    mode: state.mode,
    setMode: state.setMode,
    hideElements: state.hideElements,
  }))

  const [openCreateGameDialog, setOpenCreateGameDialog] = useState(false)

  const handleDialogOpen = () => {
    isLoggedIn ? setOpenCreateGameDialog(true) : alert('login or create an account to create a game!')
  }

  const handleDialogClose = () => {
    setOpenCreateGameDialog(false)
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
      }}>
        <MenuBox
          sx={{
            borderRadius: "4px",
            p: 0.5,
            width: "auto",
          }}>
          <Stack
            direction='row'
            spacing='auto'
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: '100%',
            }}>
              <Button
                variant="text"
                startIcon={<TimelapseIcon />}
                sx={{ mr: 1, ml: 2, opacity: mode === 'time' ? "1" : "0.55" }}
              // onClick={() => setMode('time')}
              >
                time
              </Button>
              <Button variant="text"
                startIcon={<TitleIcon />}
                sx={{ mr: 1, ml: 1, opacity: mode === 'words' ? "1" : "0.55" }}
              // onClick={() => setMode('words')}
              >
                words
              </Button>
              <Button variant="text"
                startIcon={<FormatQuoteIcon />}
                sx={{ mr: 1, ml: 1, opacity: mode === 'quote' ? "1" : "0.55" }}
              // onClick={() => setMode('quote')}
              >
                quote
              </Button>

            </Box>
          </Stack>
        </MenuBox>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          sx={{
            ml: 1,
            pl: 1,
            pr: 1,
          }}
          onClick={() => handleDialogOpen()}
        >
          Create Game
        </Button>
      </Box>
      {openCreateGameDialog && 
        <CreateGameDialog 
          open={openCreateGameDialog} 
          onClose={() => handleDialogClose()} 
        />}
    </>
  )
}
