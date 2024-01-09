import { useState } from 'react'
import {
  Popover,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Pencil1Icon } from '@radix-ui/react-icons';

import DeleteItem from "./DeleteItem"

export default function TaskPopover({ open, onClose, anchor, number, handleRemoveTask, openEditTask }) {
  const [openDelete, setOpen] = useState(false)
  return (
    <>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={onClose}
        anchorEl={anchor}
        sx={{
          ".MuiPopover-paper": {
            background: "rgb(23 23 23)",
            border: "1px solid rgb(64 64 64)",
            width: { xs: "auto", md: "auto" }
          },
        }}
      >
        <Box sx={{
          m: 2,
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
          }}>
            <Button
              variant="text"
              size='small'
              startIcon={<LaunchIcon sx={{ color: "rgb(163 163 163)" }} />}
              sx={{
                mt: 1,
                width: "100%",
                textTransform: 'none',
                color: 'rgb(242 242 242)',
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "rgba(115, 115, 115, 0.2)"
                }
              }}
            >
              Open In New Tab
            </Button>
          </Box>

          <Divider sx={{
            background: 'rgba(255, 255, 255, 0.4)',
            mt: 2,
            mb: 1,
            width: "100%"
          }} />

          <Button
            variant="text"
            size='small'
            startIcon={<SwapHorizIcon sx={{ color: "rgb(163 163 163)" }} />}
            sx={{
              mt: 1,
              width: "100%",
              textTransform: 'none',
              color: 'rgb(242 242 242)',
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "rgba(115, 115, 115, 0.2)"
              }
            }}
          >
            Move to column
          </Button>

          <Divider sx={{
            background: 'rgba(255, 255, 255, 0.4)',
            mt: 2,
            mb: 1,
            width: "100%"
          }} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Button
              fullWidth
              variant="text"
              size='small'
              startIcon={<EditIcon sx={{ color: "rgb(163 163 163)" }} />}
              sx={{
                mt: 1,
                width: "100%",
                textTransform: 'none',
                color: 'rgb(242 242 242)',
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "rgba(115, 115, 115, 0.2)"
                }
              }}
              onClick={() => openEditTask()}
            >
              Edit Details
            </Button>

            <Button
              fullWidth
              variant="text"
              size='small'
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(!openDelete)}
              sx={{
                mt: 1,
                width: "100%",
                textTransform: 'none',
                color: 'rgb(220 38 38)',
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "rgba(220, 38, 38, 0.3)"
                }
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
      {openDelete && <DeleteItem
        open={open}
        onClose={() => setOpen(!open)}
        number={number}
        handleRemoveTask={() => handleRemoveTask()}
      />}
    </>
  )
}
