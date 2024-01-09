import React from 'react'
import { Box, styled, Typography } from '@mui/material'

export default function MPGameInfo() {
    const GameInfo = styled('div', {
        name: "MuiGameInfo",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;

    return (
        <GameInfo>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between'
            }}>
                <Typography>
                    Room
                </Typography>
                <Typography>
                    0/5
                </Typography>
            </Box>
        </GameInfo>
    )
}
