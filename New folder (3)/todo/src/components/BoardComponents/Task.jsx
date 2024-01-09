import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Chip, IconButton, Link, useTheme } from '@mui/material'
import { Draggable } from '@hello-pangea/dnd'
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import TaskPopover from './TaskPopover'
import TaskPanel from '../TaskPanel/TaskPanel'
import AddTaskForm from './AddTaskForm'
import useFilter from '../../utils/useFilter'
import useStore from '../../store'

export default function Task({
    id,
    index,
    task,
    description,
    dateAdded,
    status,
    number,
    labels,
    globalLabels,
    handleRemoveTask,
    associatedColumn,
    handleTaskUpdate,
    setFilteredData,
    openPanel,
}) {
    const [openPopover, setOpenPopOver] = useState(false)
    const [openEditTask, setOpenEditTask] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openTaskPanel, setOpenTaskPanel] = useState(openPanel)

    const [searchParams, setSearchParams] = useSearchParams()

    const [paramsTaskID, setParamsTaskID] = useState('')
    const [paramsTaskColumn, setParamsTaskColumn] = useState('')

    const anchorRef = useRef()
    const { filterLabelsByClick, clearFilters } = useFilter()
    const { data } = useStore()

    const handleOpenPopover = () => {
        setOpenPopOver(!openPopover)
        setAnchorEl(anchorRef.current)
    }

    const handleTagFilter = (label) => {
        if(searchParams.getAll('filterQuery').includes(label)) {
            const params = searchParams.getAll('filterQuery')
            clearFilters('label', data, setFilteredData, label, params)
        }
        else {
            filterLabelsByClick('label', label, data, setFilteredData)
        }
    }

    const handleTaskClose = () => {
        setOpenTaskPanel(false)
        if (searchParams.has('task') && searchParams.has('column')) {
            searchParams.delete('column')
            searchParams.delete('task')
            setSearchParams(searchParams)
        }
    }

    const handleTaskOpen = () => {
        setOpenTaskPanel(true)
        setSearchParams({
            task: id,
            column: associatedColumn,
        })
    }

    const theme = useTheme()

    return (
        <>
            <Draggable
                draggableId={id}
                index={index}
            >
                {(provided, snapshot) => (
                    <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: theme.palette.currentTheme === "dark" ? "rgb(30 30 30)" : "rgb(226 232 240)",
                            border: "1px solid rgb(45 45 45)",
                            borderRadius: "4px",
                            p: 1,
                            mt: 1,
                            mr: {
                                xs: 0,
                                md: 1,
                            },
                            "&:first-of-type": {
                                mt: 0
                            },
                            "&:last-child": {
                                mb: 7,
                            },
                            "&:hover": {
                                border: "1px solid rgb(64 64 64)",
                            }
                        }}
                    >
                        {/* Task Number and Status of Task */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Box sx={{
                                width: "13px",
                                height: "13px",
                                background: "rgba(255, 0, 0, 0.3)",
                                border: "2px solid red",
                                borderRadius: "999px",
                                mr: 1,
                            }}>
                            </Box>
                            <IconButton sx={{
                                m: 0,
                                p: 0,
                            }}
                                onClick={() => handleOpenPopover()}
                            >
                                <DotsHorizontalIcon
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        color: 'rgba(163, 163, 163, 1)'
                                    }}
                                    ref={anchorRef}

                                />
                            </IconButton>
                        </Box>

                        {/* Task Description */}
                        <Box sx={{
                            mt: 1,
                        }}>
                            <Link
                                variant='body2'
                                fontWeight="400"
                                fontFamily="Poppins"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "5",
                                    WebkitBoxOrient: "vertical",
                                    cursor: 'pointer',
                                    color: theme.palette.currentTheme === "dark" ? 'white' : 'rgb(23 23 23)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: "rgb(37 99 235)",
                                        textDecoration: 'underline',
                                    }
                                }}
                                onClick={() => handleTaskOpen()}
                            >
                                {task}
                            </Link>
                        </Box>

                        {/* Task Tags/Additonal Information */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            mt: 1
                        }}>
                            {labels.map((label, key) => (
                                <Chip
                                    key={key}
                                    label={label.label}
                                    size='small'
                                    sx={{
                                        fontSize: "12px",
                                        border: `1px solid rgb(${label.color})`,
                                        backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 1)`,
                                        width: "min-content",
                                        position: "relative",
                                        mr: 1,
                                        mt: 1,
                                        "&:hover": {
                                            backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 1)`,
                                        },
                                    }}
                                    onClick={() => handleTagFilter(label.label)}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Draggable>
            {openPopover && <TaskPopover
                open={openPopover}
                onClose={() => setOpenPopOver(!openPopover)}
                anchor={anchorEl}
                handleRemoveTask={() => handleRemoveTask()}
                openEditTask={() => setOpenEditTask(true)}
            />}
            {openTaskPanel && <TaskPanel
                open={openTaskPanel}
                onClose={() => handleTaskClose()}
                task={task}
                labels={labels}
                dateAdded={dateAdded}
                description={description}
                taskId={paramsTaskID}
                taskColumn={paramsTaskColumn}
                handleTaskUpdate={handleTaskUpdate}
            />}
            {/* Edit Task Form */}
            {openEditTask && <AddTaskForm
                open={openEditTask}
                onClose={() => setOpenEditTask(!openEditTask)}
                mode={'edit'}
                currentTask={task}
                description={description}
                columnName={associatedColumn}
                handleTaskUpdate={handleTaskUpdate}
                labels={labels}
                globalLabels={globalLabels}
                id={id}
            />}
        </>
    )
}
