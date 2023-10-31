import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { PlusCircledIcon } from "@radix-ui/react-icons"

import AddColumnForm from './AddColumnForm'

export default function AddColumn() {
    const [openForm, setOpenForm] = useState(false)

    return (
        <Box
            sx={{
                m: 1,
                width: "100%",
            }}>
            <IconButton
                onClick={() => setOpenForm(!openForm)}
                disableRipple
                variant="contained"
                component="label"
                sx={{
                    background: "none",
                    borderRadius: "4px",
                    border: "1px solid rgb(64 64 64)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    color: "#555",
                    "&:hover": {
                        background: "none"
                    }
                }}
            >   
                <PlusCircledIcon />
                <Typography variant='subtitle1' sx={{pl: 1}}>Add a new column</Typography>

            </IconButton>
        </Box>
    )
}
