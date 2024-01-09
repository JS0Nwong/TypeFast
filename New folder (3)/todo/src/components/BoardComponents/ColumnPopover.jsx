import {useState} from 'react'
import {
    Popover,
    Box,
    Typography,
    Divider,
    Button,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Pencil1Icon } from '@radix-ui/react-icons';

import DeletePopover from './DeletePopover';

export default function ColumnPopover({ open, onClose, anchor, number, handleRemoveColumn, setOpenEdit }) {

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
                        width: "100%",
                    }}>
                        <Typography
                            variant='caption'
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)",
                            }}
                        >Items</Typography>
                        <Button 
                            variant="text" 
                            startIcon={<DeleteIcon />}
                            size='small'
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
                        <Typography
                            variant='caption'
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)"
                            }}
                        >Column</Typography>
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
            {openDelete && <DeletePopover 
                open={open} 
                onClose={() => setOpen(!open)}
                number={number}
                handleRemoveColumn={() => handleRemoveColumn()}
            />}
        </>
    )
}
