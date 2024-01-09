import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { PlusCircledIcon } from "@radix-ui/react-icons"

import AddColumnForm from './AddColumnForm'

export default function AddColumn({addColumn}) {
    const [openForm, setOpenForm] = useState(false)

    return (
        <>
            <Box
                sx={{
                    m: 1,
                    minWidth: "230px"
                }}>
                <IconButton
                    onClick={() => setOpenForm(!openForm)}
                    disableRipple
                    variant="contained"
                    component="label"
                    sx={{
                        background: "none",
                        borderRadius: "4px",
                        border: "1px dashed rgb(64 64 64)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        color: "#555",
                        "&:hover": {
                            background: "none"
                        },
                    }}
                >
                    <PlusCircledIcon />
                    <Typography variant='subtitle1' sx={{ pl: 1 }}>Add a new column</Typography>
                </IconButton>
            </Box>
            {openForm && <AddColumnForm
                open={openForm}
                onClose={() => setOpenForm(!openForm)}
                addColumn={addColumn}
            />}
        </>
    )
}
