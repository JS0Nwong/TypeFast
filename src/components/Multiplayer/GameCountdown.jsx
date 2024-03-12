import React from 'react'
import { Box, Typography } from '@mui/material'
import { useBoundStore } from '../../utils/stores/boundStore'

export default function GameCountdown() {
    const { startGameCountdown } = useBoundStore((state) => ({
        startGameCountdown: state.startGameCountdown
    }))

    return (
        <>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: "50%",
                maxHeight: "160px",
                height: '100%',
                transform: "translate(-50%, -50%)",
                width: "100%",
                textAlign: 'center',
                zIndex: 99,
                backdropFilter: 'blur(4px)',
                transition: '0.65s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h3'>{startGameCountdown}</Typography>
            </Box>
        </>
    )
}
