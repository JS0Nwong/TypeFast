import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Chip,
  Stack
} from '@mui/material'
import { Cross1Icon, PlusCircledIcon } from '@radix-ui/react-icons'

export default function AddTaskForm({ 
  open, 
  onClose, 
  handleAddTask, 
  columnName, 
  mode,
  currentTask,
  handleTaskUpdate,
  labels,
  globalLabels,
  description,
  id
}) {
  const [task, setTask] = useState('')
  const [addLabels, setAddLabels] = useState(labels)

  const handleSubmit = () => {
    if(mode === "edit") { 
      handleTaskUpdate(
        id, 
        task === "" ? currentTask : task, 
        addLabels.length !== 0 ? addLabels : labels,
        description, 
        columnName)
      onClose()
    }
    else {
      if(!task.trim()) alert('name cannot be empty')
      handleAddTask(task, addLabels, columnName) 
      onClose()
    }
  }

  const handleAddLabel = (label) => {
    if(!addLabels.some((addedLabel) => addedLabel.label_uid === label.label_uid)) {
      addLabels.push(label)
    }
    else{
      addLabels.pop(label)
    }
  }

  const handleClick = () => {

  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          ".MuiDialog-paper": {
            background: 'rgb(17 17 17)',
            border: "1px solid rgb(64 64 64)",
          }
        }}
      >
        <DialogContent>
          <DialogTitle sx={{
            color: 'white',
            fontWeight: "500",
            fontSize: "1rem",
            fontFamily: "Poppins",
          }}>
            {mode === 'edit' ? `Edit Item for ${columnName}` : `New Item for ${columnName}`}
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
            maxWidth: "300px"
          }}>

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
                    },
                    mt: 1,
                  }}>Item: </FormLabel>
                  <Input
                    placeholder={currentTask !== undefined ? currentTask : "Task"}
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
                    onChange={(e) => setTask(e.target.value)}
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
                    mb: 1,
                  }}>Labels: </FormLabel>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    {mode === "edit" ? globalLabels.map((label, index) => (
                      <Chip
                        key={index}
                        label={label.label}
                        size='small'
                        sx={{
                          fontSize: "12px",
                          border: `1px solid rgb(${label.color})`,
                          backgroundColor:
                            labels.map(currentLabels => currentLabels.label_uid).includes(label.label_uid) ?
                              `rgba(${label.color.replace(/['"]+/g, '')}, 1)` : "none",
                          width: "min-content",
                          "&:hover": {
                            backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 0.25)`,
                          },
                        }}
                        onClick={() => handleAddLabel(label)}
                      />
                    )) :
                      labels.map((label, index) => (
                        <Chip
                          key={index}
                          label={label.label}
                          size='small'
                          sx={{
                            fontSize: "12px",
                            border: `1px solid rgb(${label.color})`,
                            backgroundColor:
                              labels.map(currentLabels => currentLabels.label_uid).includes(label.label_uid) ?
                                `rgba(${label.color.replace(/['"]+/g, '')}, 1)` : "none",
                            width: "min-content",
                            "&:hover": {
                              backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 0.25)`,
                            },
                          }}
                          onClick={() => handleAddLabel(label)}
                        />
                      ))

                    }
                    <Chip
                      label="Add Label"
                      size='small'
                      sx={{
                        fontSize: "12px",
                        background: 'rgb(38 38 38)',
                        width: "min-content",
                        position: "relative",
                        "&:hover": {
                          background: 'rgb(64 64 64)',
                        },
                      }}
                      onClick={() => handleClick()}
                      icon={<PlusCircledIcon />}
                    />
                  </Stack>
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
              {mode === "edit" ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
