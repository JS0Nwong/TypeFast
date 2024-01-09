import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useTheme
} from '@mui/material'
import { Cross1Icon } from '@radix-ui/react-icons'

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

export default function AddColumnForm({
  open,
  onClose,
  addColumn,
  mode,
  existingColumnName,
  currentColor,
  handleColumnUpdate,
  currentDescription
}) {
  const theme = useTheme()
  const [columnName, setColumnName] = useState(existingColumnName !== undefined ? existingColumnName :'')
  const [description, setDescription] = useState(currentDescription !== undefined ? currentDescription : '')
  const [currentColorFocus, setColor] = useState(currentColor !== undefined ? currentColor : '52, 58, 64')

  const handleSubmit = () => {
    if(mode ==='edit') {
      handleColumnUpdate(existingColumnName, columnName, description, currentColorFocus)
      onClose()
    }
    else {
      if(!columnName.trim()) alert('name cannot be empty')
      addColumn(columnName, description, currentColorFocus) 
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDialog-paper": {
          background: theme.palette.currentTheme === "dark" ? "rgb(17 17 17)":  "rgb(229 231 235)",
          border: "1px solid rgb(64 64 64)",
          m: 1,
        }
      }}
    >
      <DialogTitle sx={{
        fontWeight: "500",
        fontSize: "1rem",
        fontFamily: "Poppins"
      }}>
        {mode === 'edit' ? 'Edit Column' : 'New Column'}
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
        justifyContent: 'center',
      }}>
        <Box sx={{
          backgroundColor: `rgba(${currentColorFocus.replace(/['"]+/g, '')}, 0.15)`,
          color: `rgb(${currentColorFocus})`,
          border: `1px solid rgb(${currentColorFocus})`,
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
              color: `${currentColorFocus}`,
              mr: 1,
              ml: 1,
              fontSize: "12px",
              opacity: "",
              maxWidth: "220px"
            }}
          >{columnName}</Typography>
        </Box>
        <form >
          <Box sx={{
            display: 'flex',
            flexDirection: "column"
          }}>
            <FormControl required>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  fontFamily: "Poppins"
                },
                ".MuiFormLabel-asterisk": {
                  color: "red"
                }
              }}
              label="color"
              >Color: </FormLabel>
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
                    outline: 
                      currentColorFocus === color ? 
                      `2px solid ${theme.palette.currentTheme === "dark" ? "rgb(255, 255, 255) ": "rgb(22, 22, 22)"}` : "none",
                    outlineOffset: "2px",
                    m: 0.5,
                    "&:hover": {
                      backgroundColor: `rgb(${color})`,
                    },
                    "&:first-of-type": {
                      ml: 0,
                    },
                    "&:last-of-type": {
                      mr: 0,
                    }
                  }}
                  onClick={() => setColor(color)}
                >
                  </IconButton>
                ))}
              </Box>

            </FormControl>

            <FormControl required>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  color: theme.palette.currentTheme === "dark" ? "white" : "rgb(23 23 23)",
                  fontFamily: "Poppins",
                  fontWeight: "500"
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
                placeholder={existingColumnName !== undefined ? existingColumnName :"Name"}
                disableUnderline
                sx={{
                  pl: 1,
                  pr: 1,
                  pb: 0.5,
                  pt: 0.5,
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
                onChange={(e) => setColumnName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{
                "&.MuiFormLabel-root": {
                  color: theme.palette.currentTheme === "dark" ? "white" : "rgb(23 23 23)",
                  fontFamily: "Poppins",
                  fontWeight: "500"
                },
                mt: 1
              }}>Description: </FormLabel >
              <Input
                placeholder={currentDescription !== undefined ? currentDescription : "Description"}
                disableUnderline
                sx={{
                  pl: 1,
                  pr: 1,
                  pb: 0.5,
                  pt: 0.5,
                  overflow: "visible",
                  fontWeight: "500",
                  border: "1px solid #555",
                  borderRadius: "4px",
                  "&.MuiInputBase-root ": {
                    "&.Mui-focused ": {
                      border: "1px solid #aaa"
                    }
                  },
                  "&.Mui-focused": {
                    outline: '1px solid #111111'
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
          onClick={() => handleSubmit()}
          size="small"
          sx={{
            m: 2,
            background: "white",
            color: "#232323",
            "&:hover": {
              background: "white",
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
