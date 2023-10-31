import React from 'react'
import { Box, Chip, Typography } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

export default function Task() {
    return (
        <Draggable>
            {(provided, snapshot) => (
                <Box
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "rgb(30 30 30)",
                        border: "1px solid rgba(229, 229, 229, 0.1)",
                        borderRadius: "4px",
                        p: 1,
                    }}
                >
                    <Box>

                    </Box>
                    
                    <Typography variant='body2'>
                        asdsd
                    </Typography>

                    <Box>
                        <Chip />
                    </Box>
                </Box>
            )}
        </Draggable>
    )
}
