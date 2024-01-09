import React from 'react'
import { Skeleton, Box } from '@mui/material'

export default function BoardLoading() {
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
                    <Skeleton variant="rounded" width={"100%"} height={48} sx={{background: 'rgb(64 64 64)' }} />
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
        </>
    )
}
