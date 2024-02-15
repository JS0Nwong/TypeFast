import {
  Box,
  Stack,
  Button,
  Divider,
  styled,
} from "@mui/material"
import NumbersIcon from '@mui/icons-material/Numbers';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TitleIcon from '@mui/icons-material/Title';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { motion } from 'framer-motion'

import TimeOptions from './TimeOptions';
import WordOptions from './WordOptions';

import { useBoundStore } from '../../utils/stores/boundStore';

const MenuBox = styled("div", {
  name: "MuiDiv",
  overridesResolver: (props, styles) => {
    return [styles.root]
  }
})``;

const renderSwitch = (param) => {
  switch (param) {
    case 'time':
      return <TimeOptions />
    case 'words':
      return <WordOptions />
    case 'quote':
      return <TimeOptions />
    case 'zen':
      return <></>
    default:
      return <TimeOptions />
  }
}

export default function Menubar() {
  const {
    mode,
    setMode,
    hideElements,
  } = useBoundStore((state) => ({
    mode: state.mode,
    setMode: state.setMode,
    hideElements: state.hideElements,
  }))

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        mt: 7,
        width: "100%",
        opacity: hideElements ? 0 : 1,
      }}>
        <MenuBox
          sx={{
            borderRadius: "4px",
            p: 0.5,
            width: 'auto',
          }}>
          <Stack
            direction='row'
            spacing='auto'
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* Text Options */}
            <Box sx={{
              display: mode === 'zen' ? 'none' : 'flex',
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}>
              <Button
                variant="text"
                startIcon={<AlternateEmailIcon />}
                sx={{
                  padding: 0,
                  minHeight: 0,
                  minWidth: 0,
                  mr: 2,
                  ml: 2,
                }}
              >
                Puncuations
              </Button>
              <Button variant="text"
                startIcon={<NumbersIcon />}
                sx={{
                  padding: 0,
                  minHeight: 0,
                  minWidth: 0,
                  mr: 2,
                  ml: 2,
                }}
              >
                Numbers
              </Button>
            </Box>
            {/* Test Modes */}
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
                onClick={() => setMode('time')}
              >
                time
              </Button>
              <Button variant="text"
                startIcon={<TitleIcon />}
                sx={{ mr: 1, ml: 1, opacity: mode === 'words' ? "1" : "0.55" }}
                onClick={() => setMode('words')}

              >
                words
              </Button>
              <Button variant="text"
                startIcon={<FormatQuoteIcon />}
                sx={{ mr: 1, ml: 1, opacity: mode === 'quote' ? "1" : "0.55" }}
                onClick={() => setMode('quote')}

              >
                quote
              </Button>
              <Button variant="text"
                startIcon={<SelfImprovementIcon />}
                sx={{ mr: 1, ml: 1, opacity: mode === 'zen' ? "1" : "0.55" }}
                onClick={() => setMode('zen')}
              >
                zen
              </Button>
            </Box>
            {/* Test Mode Options */}
            {renderSwitch(mode)}
          </Stack>
        </MenuBox>
      </Box>
    </>
  )
}
