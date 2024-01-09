import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { PlusCircledIcon } from "@radix-ui/react-icons"
import CreateBoardForm from './CreateBoardForm'

export default function CreateBoard() {
    const [openForm, setOpenForm] = useState(false)

    return (
        <>
            <IconButton
                onClick={() => setOpenForm(!openForm)}
                disableRipple
                variant="contained"
                component="label"
                sx={{
                    width: { xs: "100%", md: "200px" },
                    mt: { xs: 1, md: 0 },
                    mb: { xs: 1, md: 0 },
                    m: { xs: 0, md: 1 },
                    background: "none",
                    borderRadius: "4px",
                    border: "1px dashed rgb(115 115 115)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(82 82 82)",
                    "&:hover": {
                        background: "none"
                    },
                }}
            >
                <PlusCircledIcon />
                <Typography variant='subtitle1' sx={{ pl: 1 }}>Add a new Board</Typography>

            </IconButton>
            {openForm && <CreateBoardForm
                open={openForm}
                onClose={() => setOpenForm(!openForm)}
            />}
        </>
    )
}
