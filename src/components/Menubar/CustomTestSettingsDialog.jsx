import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { useBoundStore } from '../../utils/stores/boundStore'
import { generate } from "random-words";

export default function CustomTestSettingsDialog({open, onClose}) {
  const {
    mode,
    setCustomTime,
    setCustomWordsAmount,
    customTime,
    customWordsAmount,
    setText,
  } = useBoundStore((state) => ({
    mode: state.mode,
    setCustomTime: state.setCustomTime,
    setCustomWordsAmount: state.setCustomWordsAmount,
    setText: state.setText,
    customTime: state.customTime,
    customWordsAmount: state.customWordsAmount,
  }))
  const [userCustomAmount, setUserCustomAmount] = useState(mode === 'time' ? customTime : customWordsAmount)

  const handleSubmit = () => {
    if (mode === 'time') {
      setCustomTime(userCustomAmount)
      onClose()
    }
    else if (mode === 'words') {
      setCustomWordsAmount(userCustomAmount)
      onClose()
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
        sx={{
          ".MuiPaper-root": {
            maxWidth: "400px",
            borderRadius: "13px",
          }
        }}
      >
        <DialogTitle>{mode === 'time' ? 'Test duration' : 'Word amount'}</DialogTitle>
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          p: 3
        }}>
          {mode === 'time'
            ? <Typography
              variant="body2"
              sx={{ mb: 2, opacity: 0.55 }}>
              Total time: {userCustomAmount === 0 ? 'infinite' : userCustomAmount + 's'}
            </Typography>
            : <></>}
          <TextField 
            type='number'
            fullWidth
            autoFocus={true}
            autoComplete='off'
            defaultValue={userCustomAmount}
            sx={{

            }}
            onChange={(e) => setUserCustomAmount(e.target.value)}
          />
          <Typography variant='caption' sx={{ mt: 2, opacity: 0.55 }}>
            You can start an infinite test by inputting 0.
            Then, to stop the test, use the Bail Out feature 
            (esc or ctrl/cmd + shift + p &gt; Bail Out)
          </Typography>
          <Button
            variant='contained'
            sx={{
              mt: 3,
              p: 0.5,
            }}
            onClick={() => handleSubmit()}
          >
            Ok
          </Button>
        </Box>
      </Dialog>
    </>
  )
}
