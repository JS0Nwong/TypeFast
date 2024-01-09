import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Stack
} from '@mui/material'
import { Cross1Icon } from '@radix-ui/react-icons'

import useFirebaseHooks from '../../utils/firebaseHooks'

const colors = [
  '52, 58, 64',
  '249, 65, 68',
  '248, 150, 30',
  '249, 199, 79',
  '144, 190, 109',
  '39, 125, 161',
  '105, 48, 195',
  '255, 112, 166',
]

export default function CreateBoardForm({ open, onClose }) {
  const [boardName, setBoardName] = useState('')
  const [description, setDescription] = useState('')
  const [currentColor, setColor] = useState('52, 58, 64')

  const { createBoard } = useFirebaseHooks()

  const handleSubmit = async() => {
    if(!boardName.trim()) return
    try {
      await createBoard({name: boardName, color: currentColor, description: description})
      onClose()
    }
    catch (error) {
      console.log(error)
    }
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
        }
      }}
    >
      <DialogTitle sx={{
        color: 'white',
        fontWeight: "500",
        fontSize: "1rem"
      }}>
        New Board
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Cross1Icon />
      </IconButton>

      <DialogContent sx={{
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center'
      }}>
        <Box sx={{
          backgroundColor: `rgba(${currentColor.replace(/['"]+/g, '')}, 0.15)`,
          color: `rgb(${currentColor})`,
          border: `1px solid rgb(${currentColor})`,
          borderRadius: '999px',
          minWidth: "20px",
          minHeight: '20px',
          maxWidth: "100%",
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          textOverflow: "ellipsis",
          overflow: 'hidden',
          "&:before": {
            opacity: "0.4"
          }
        }}>
          <Typography
            noWrap
            sx={{
              color: `${currentColor}`,
              mr: 1,
              ml: 1,
              fontSize: "12px",
              opacity: "",
              maxWidth: "220px"
            }}
          >{boardName}</Typography>
        </Box>

        {/* Create board form (Color, Name, Description Inputs) */}
        <form>
          <Box sx={{
            display: 'flex',
            flexDirection: "column"
          }}>
            <FormControl required>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  color: "white"
                },
                ".Mui-focused": {
                  color: "white"
                },
                ".MuiFormLabel-asterisk": {
                  color: "red"
                }
              }}>Color: </FormLabel>
              <Box sx={{
                display: "flex",
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}>
                {colors.map((color, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      backgroundColor: `rgb(${color})`,
                      height: "30px",
                      width: "25px",
                      borderRadius: "2px",
                      m: 0.5,
                      "&:hover": {
                        backgroundColor: `rgb(${color})`,
                      },
                      "&:first-of-type": {
                        ml: 0,
                      },
                      "&:last-child": {
                        mr: 0,
                      },
                      outline: currentColor === color ? "2px solid rgb(255, 255, 255)" : "none",
                      outlineOffset: "2px"
                    }}
                    onClick={() => setColor(color)}
                  >
                  </IconButton>
                ))}
              </Box>

            </FormControl>

            {/* Name */}
            <FormControl required>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  color: "white"
                },
                ".Mui-focused": {
                  color: "white"
                },
                ".MuiFormLabel-asterisk": {
                  color: "red"
                },
                mt: 1,
              }}>Name: </FormLabel>
              <Input
                name='board-name'
                placeholder="Name"
                disableUnderline
                sx={{
                  color: "#FFFFFF",
                  pl: 1,
                  pr: 1,
                  overflow: "visible",
                  fontWeight: "500",
                  border: "1px solid #555",
                  borderRadius: "4px",
                  "&.MuiInputBase-root ": {
                    "&.Mui-focused ": {
                      border: "1px solid #aaa"
                    }
                  },
                  mb: 2,
                }}
                autoComplete="off"
                onChange={(e) => setBoardName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  color: "white"
                },
                ".Mui-focused": {
                  color: "white"
                },
                mt: 1,
              }}>Description: </FormLabel>
              <Input
                name="description"
                placeholder="Description"
                disableUnderline
                sx={{
                  color: "#FFFFFF",
                  pl: 1,
                  pr: 1,
                  overflow: "visible",
                  fontWeight: "500",
                  border: "1px solid #555",
                  borderRadius: "4px",
                  "&.MuiInputBase-root ": {
                    "&.Mui-focused ": {
                      border: "1px solid #aaa"
                    }
                  }
                }}
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Box>
        </form>

      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          autoFocus
          onClick={onClose}
          size="small"
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          autoFocus
          size="small"
          sx={{
            m: 2,
            background: "white",
            color: "#232323",
            "&:hover": {
              background: "white",
            }
          }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
