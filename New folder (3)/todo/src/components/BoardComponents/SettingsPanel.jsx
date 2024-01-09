import { useState } from 'react'
import {
  Popover,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material"
import { useParams } from 'react-router-dom'
import BoardViewSetting from './BoardViewSetting';
import TaskViewSetting from './TaskViewSetting';
import AddLabelsForm from "./AddLabelsForm";
import { getAuth, signOut } from "firebase/auth";
import useFirebaseHooks from '../../utils/firebaseHooks'
import useStore from '../../store';

export default function SettingsPanel({ open, onClose, anchor }) {
  const { id } = useParams();
  const { updateLabels } = useFirebaseHooks()
  const { setAuth } = useStore()

  const handleBoardUpdate = async (data) => {
    await updateLabels(id, data)
  }

  const handleAddLabel = (label, color, id) => {
    const newLabel = {
      label: label,
      color: color,
      label_uid: id
    }

    try {
      handleBoardUpdate(newLabel)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignout = () => {
    const auth = getAuth()
    auth.currentUser ? signOut(auth) : console.log("not signed into an account")
    setAuth(false)
  }

  const [openLabel, setOpenLabels] = useState(false)

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
            width: { xs: "auto", md: "20%" },
          },
        }}
      >
        <Box sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}>
          <Typography
            fontFamily="Poppins"
            fontWeight="500"
            fontSize="14px"
          >Settings</Typography>

          <Typography
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
            sx={{
              color: "rgb(82 82 82)"
            }}
          >Change the settings of this board
          </Typography>
        </Box>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          justifyContent: "space-between",
        }}>
          {/* <BoardViewSetting />
          <TaskViewSetting /> */}

          <Box sx={{
            display: "flex",
            flexDirection: 'row',
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
          }}>
            <Typography fontFamily="Poppins" fontWeight="500" fontSize="14px" sx={{ width: "100%" }}>
              Labels
            </Typography>
            <Button
              size='small'
              variant='outlined'
              fullWidth
              disableRipple
              sx={{
                m: 0,
                p: 0,
                "&:label": {
                  color: "#fff"
                },
                "&.MuiButton-outlined": {
                  border: '1px solid rgb(64 64 64)',
                  pt: '2px',
                  pb: '2px',
                  pr: "2px",
                  fontFamily: "Poppins",
                  fontSize: "12px"
                },
              }}
              onClick={() => setOpenLabels(!openLabel)}
            >
              Add Labels
            </Button>
          </Box>

        </Box>

        <Box sx={{
          p: 1
        }}>
          <Button
            disableRipple
            fullWidth
            size='small'
            sx={{
              fontFamily: "Poppins",
              fontWeight: "500",
              color: "rgb(220 38 38)",
              "&:hover": {
                backgroundColor: "rgba(220, 38, 38, 0.2)"
              }
            }}
            onClick={() => handleSignout()}
          >
            Log out
          </Button>
        </Box>
      </Popover>
      {openLabel && <AddLabelsForm
        open={openLabel}
        onClose={() => setOpenLabels(!openLabel)}
        handleAddLabel={handleAddLabel}
      />}
    </>
  )
}
