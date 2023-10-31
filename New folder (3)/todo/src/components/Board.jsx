import React from 'react'
import { Box, Typography } from '@mui/material'
import Column from './Column'
import AddColumn from './AddColumn'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export default function Board() {

    const handleDragEnd = (res) => {
        const { destination, source, draggableId } = res
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        sx={{
                            width: "100%",
                            minHeight: '100%',
                            display: "flex",
                            flexDirection: "row",
                        }}>
                        <Column />
                        <Column />
                        <Column />
                        <Column />
                        <Column />
                        <AddColumn />
                    </Box>
                )}

            </Droppable>
        </DragDropContext>
    )
}
