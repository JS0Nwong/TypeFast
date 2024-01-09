import { useState } from 'react'
import { Skeleton, Box, Dialog, DialogContent, Typography, useTheme, IconButton } from '@mui/material'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router'

export default function BoardError() {
    const [dialogOpen, setDialogOpen] = useState(true)
    const theme = useTheme()
    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/boards')
    }

    return (
        <>
            <Box sx={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%",
            }}>
                <Box sx={{
                    p: 1,
                }}>
                    <Skeleton variant="rounded" width={"100%"} height={48} sx={{ background: 'rgb(64 64 64)' }} />
                </Box>
                <Box
                    sx={{
                        height: '100%',
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        width: "100%",
                        p: 1,
                    }}>
                    <Skeleton variant="rounded" width={"100%"} height={"100%"} sx={{ background: 'rgb(64 64 64)' }} />

                </Box>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    ".MuiDialog-paper": {
                        background: theme.palette.currentTheme === "dark" ? "rgb(17 17 17)" : "rgb(229 231 235)",
                        border: "1px solid rgb(64 64 64)",
                        m: 1,
                    },
                    background: 'rgba(104, 104, 104, 0.25)'
                }}
            >
                 <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Cross1Icon />
                </IconButton>

                <DialogContent>
                    <Typography>
                        Sorry, but you do not have permission to view this board.
                        You can request access from the owner to view this board.
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}
