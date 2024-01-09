import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Input,
    IconButton,
    Button,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Switch
} from '@mui/material'
import { Cross1Icon, ExternalLinkIcon } from '@radix-ui/react-icons'
import useFirebaseHooks from '../../utils/firebaseHooks'

export default function ShareBoard({ id, data, open, onClose }) {
    const { 
        updateBoardEditPermissions, 
        updateBoardViewPermissions, 
        updateUsers, 
        updateUserPermissionChange,
        uid, 
        email 
    } = useFirebaseHooks()

    const [accessPermissions, setAccessPermissions] = useState('view')
    const [copySuccess, setCopySuccess] = useState(false)
    const [sharedUsers, setSharedUsers] = useState('')
    const [canViewPublicly, setCanViewPublicly] = useState(data.isPubliclyViewable)
    const [canEditPublicly, setCanEditPublicly] = useState(data.isPubliclyEditable)

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopySuccess(true)
    }

    const handleSelectChange = (e, user) => {
        setAccessPermissions(e.target.value)
        updateUserPermissionChange(id, user, e.target.value)
    }

    const handleAddUser = () => {
        sharedUsers.match(/@/) ? 
        updateUsers(id, sharedUsers)
        :
        console.log('not an email')
    }

    const handleGlobalEdit = () => {
        setCanEditPublicly(!canEditPublicly)
        updateBoardEditPermissions(id, !canEditPublicly)
    }

    const handleGlobalView = () => {
        setCanViewPublicly(!canViewPublicly)
        updateBoardViewPermissions(id, !canViewPublicly)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{
                    ".MuiDialog-paper": {
                        background: 'rgb(17 17 17)',
                        border: "1px solid rgb(38 38 38)",
                        m: 1,
                        width: { xs: "auto", sm:"45%", md: "25%" },
                    }
                }}
            >
                <DialogTitle sx={{
                    color: 'white',
                    fontWeight: "500",
                    fontSize: "1rem"
                }}>
                    Share Board
                </DialogTitle>

                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: 1
                    }}>
                        <Typography fontWeight="500">People With Access</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            mt: 1,
                        }}>
                            <Input
                                fullWidth
                                disableUnderline
                                placeholder={'Add an email to start sharing'}
                                sx={{
                                    pl: 1,
                                    pr: 1,
                                    overflow: "visible",
                                    fontWeight: "300",
                                    fontSize: "16px",
                                    border: "1px solid #555",
                                    borderRadius: "4px",
                                    "&.MuiInputBase-root ": {
                                        "&.Mui-focused ": {
                                            border: "1px solid #aaa"
                                        }
                                    },
                                }}
                                onChange={(e) => setSharedUsers(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                sx={{
                                    m: 0,
                                    p: 0,
                                    ml: 1,
                                    fontWeight: "400",
                                }}
                                onClick={handleAddUser}
                            >
                                Add
                            </Button>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "column",
                            mt: 2,
                        }}>
                            {data?.sharedToUsers.map((user, index) =>
                                <Typography key={index} fontWeight="400" sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: 'space-between',
                                    width: "100%",
                                    '&:last-of-type': {
                                        mt: 1,
                                    }
                                }}>{user.email} {user.email === email ?
                                    <span
                                        style={{
                                            fontWeight: "500",
                                            color: "rgb(104 104 104)"
                                        }}>You</span> :
                                    <Select
                                        inputProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: 'rgb(38 38 38)',
                                                    }
                                                }
                                            }
                                        }}
                                        variant='filled'
                                        defaultValue={user.canEdit === true ? "edit" : "view"}
                                        label="Role"
                                        onChange={(e) => handleSelectChange(e, user)}
                                        sx={{
                                            m: 0,
                                            p: 0,
                                            fontSize: "14px",
                                            ".MuiSelect-filled": {
                                                p: 1,
                                                pr: 2,
                                                pl: 2,
                                                background: "rgb(38 38 38)",
                                                borderRadius: "4px",
                                            },
                                            "&:before": {
                                                borderColor: "transparent"
                                            },
                                            "&:after": {
                                                borderColor: "transparent"
                                            },
                                        }}
                                    >
                                        <MenuItem value="view">View</MenuItem>
                                        <MenuItem value="edit">View & Edit</MenuItem>
                                    </Select>}
                                </Typography>
                            )}
                        </Box>
                        <Typography fontWeight="500" sx={{ mt: 2 }}>General Access</Typography>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography
                                fontFamily="Poppins"
                                fontWeight="500"
                                fontSize="14px"
                                sx={{
                                    color: "rgb(104 104 104)"
                                }}>
                                Anyone with link can view</Typography>
                            <FormControl size="small" sx={{
                                m: 0,
                            }}>
                                <Switch
                                    checked={canViewPublicly}
                                    onChange={() => handleGlobalView()}
                                />
                            </FormControl>

                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography
                                fontFamily="Poppins"
                                fontWeight="500"
                                fontSize="14px"
                                sx={{
                                    color: "rgb(104 104 104)"
                                }}>
                                Anyone with link can edit</Typography>
                            <FormControl size="small" sx={{
                                m: 0,
                            }}>
                                <Switch
                                    checked={canEditPublicly}
                                    onChange={() => handleGlobalEdit()}
                                />
                            </FormControl>

                        </Box>


                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            mt: 3,
                        }}>
                            <Button
                                variant='contained'
                                startIcon={<ExternalLinkIcon />}
                                onClick={() => handleCopy()}
                            >
                                Copy Link
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={onClose}
                            >
                                Done
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                {copySuccess && <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={copySuccess}
                    autoHideDuration={4000}
                    onClose={() => setCopySuccess(!copySuccess)}
                >
                    <Alert severity='success' onClose={() => setCopySuccess(!copySuccess)}>
                        Sucessfully copied link!
                    </Alert>
                </Snackbar>}
            </Dialog>

        </>
    )
}
