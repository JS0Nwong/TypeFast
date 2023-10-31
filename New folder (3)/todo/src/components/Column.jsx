import { useEffect, useState } from 'react'
import { Box, Icon, IconButton, Typography, Button } from '@mui/material'
import Task from './Task'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import AddIcon from '@mui/icons-material/Add';

export default function Column() {

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
                        borderRadius: '4px',
                        border: "1px solid rgb(64 64 64)",
                        m: 1,
                        width: "100%",
                        height: '100%',
                        backgroundColor: "rgb(17 17 17)",
                        position: "relative",
                    }}>
                    {/* Column Header (Title, Description, Tasks Number, Color, Settings) */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'column',
                        m: 1,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Typography
                                fontWeight="600"
                            >
                                asd
                            </Typography>
                            <IconButton
                                sx={{
                                    m: 0,
                                    p: 0,
                                }}
                            >
                                <DotsHorizontalIcon style={{
                                    width: "20px",
                                    height: "20px",
                                    color: 'rgba(163, 163, 163, 1)'
                                }} />
                            </IconButton>
                        </Box>
                        <Typography
                            variant='subtitle2'
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)"
                            }}
                        >sasdsad</Typography>
                    </Box>

                    {/* Task List (All current tasks within the category column) */}
                    <Droppable>
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                                sx={{
                                    m: 1
                                }}
                            >
                                <Task />
                            </Box>
                        )}
                    </Droppable>

                    {/* Add Task to Column Button */}
                    <Button
                        disableRipple
                        variant='outlined'
                        startIcon={<AddIcon />}
                        sx={{
                            m: 1,
                            textTransform: 'none',
                            color: 'rgba(255, 255, 255, 0.4)',
                            "&.MuiButton-outlined": {
                                border: "1px solid rgb(64 64 64)",
                            },
                        }}>
                        Add Item
                    </Button>
                </Box>
            )}
        </Draggable>
    )
}
