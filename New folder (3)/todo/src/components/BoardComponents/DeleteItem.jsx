import React from 'react'
import { Dialog, Typography, Box, Button, DialogTitle, IconButton, DialogActions, DialogContent} from '@mui/material'
import { Cross1Icon } from '@radix-ui/react-icons'

export default function DeleteItem({open, onClose, handleRemoveTask}) {
  const handleSubmit = () => {
    handleRemoveTask()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDialog-paper": {
          background: 'rgb(17 17 17)',
          border: "1px solid rgb(64 64 64)",
          m: 1,
          width: "300px"
        }
      }}
    >
      <DialogTitle sx={{
        color: 'white',
        fontWeight: "500",
        fontSize: "1rem"
      }}>
        Delete Item
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'rgb(229 229 229)',
        }}
      >
        <Cross1Icon />
      </IconButton>

      <DialogContent sx={{
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        color: "rgb(115 115 115)"
      }}>
        <Typography>Are you sure you want to delete this item.
          <span style={{fontWeight: "600"}}> This cannot be undone.</span>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          autoFocus
          onClick={onClose}
          size="small"
          sx={{
            background: "rgb(64 64 64)",
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          autoFocus
          onClick={() => handleSubmit()}
          size="small"
          sx={{
            m: 2,
            background: "rgb(64 64 64)",
            color: "rgb(220 38 38)",
            "&:hover": {
              background: "rgb(220 38 38)",
              color: "white",
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
