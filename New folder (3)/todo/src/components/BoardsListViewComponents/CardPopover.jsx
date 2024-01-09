import {useState} from 'react'
import {
    Popover,
    Box,
    Typography,
    Button,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useFirebaseHooks from "../../utils/firebaseHooks"

import DeleteBoard from './DeleteBoard';

export default function CardPopover({ open, onClose, anchor, id }) {
    const [openDelete, setOpen] = useState(false)

    const {deleteBoard} = useFirebaseHooks()

    const handleRemoveBoard = () => {
        deleteBoard(id)
    }

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
                        width: {xs: "auto", md: "auto"}
                    },
                }}
            >
                <Box sx={{
                    m: 2,
                }}>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography
                            variant='caption'
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)"
                            }}
                        >Board</Typography>
                         <Button 
                            fullWidth
                            variant="text" 
                            size='small' 
                            startIcon={<EditIcon sx={{color: "rgb(163 163 163)"}}/>}
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
                            onClick={() => setOpenEdit()}
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
            {openDelete && <DeleteBoard 
                open={open} 
                onClose={() => setOpen(!open)}
                handleRemoveBoard={() => handleRemoveBoard()}
            />}
        </>
    )
}