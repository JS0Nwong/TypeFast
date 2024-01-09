import { useState, useCallback, useEffect } from 'react'
import { Box } from '@mui/material'
import Column from './Column'
import AddColumn from './AddColumn'
import Searchbar from './Searchbar'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useSearchParams} from 'react-router-dom'

import useFirebaseHooks from '../../utils/firebaseHooks'
import useReorder from '../../utils/reorder'
import useFilter from '../../utils/useFilter'

export default function Board({ columns, id, orderBy, labels, canEdit }) {
    const { updateBoard, updateColumnKeys } = useFirebaseHooks()
    const { reorder, reorderMap, moveBetween } = useReorder()
    const [tasks, setTasks] = useState(structuredClone(columns))
    const [filtered, setFiltered] = useState(null)  
    const [loading, setLoading] = useState(false)
    const [keys, setKeys] = useState(orderBy)

    const [searchParams, setSearchParams] = useSearchParams()
    const {filterTasks, filterLabels, filterAll} = useFilter()

    useEffect(() => {
        if (searchParams.has('filterType') || searchParams.has('filterQuery')) {
            //searching by all if there is no filter type of task or labels
            (searchParams.get('filterQuery') !== null && searchParams.get('filterType') === null) ?
            
                filterAll(searchParams.get('filterQuery'), tasks, setFiltered) :

                //searching by filter types of labels or tasks
                searchParams.get('filterQuery') !== null && searchParams.get('filterType') === "task" ?
                    filterTasks(
                        searchParams.get('filterType'),
                        searchParams.get('filterQuery'),
                        tasks,
                        setFiltered
                    ) : filterLabels(
                        searchParams.get('filterType'),
                        searchParams.getAll('filterQuery'),
                        tasks,
                        setFiltered
                    )
        }
    }, [])

    const handleBoardUpdate = async(data) => {
        await updateBoard(id, data)
        setTasks(data)
    }

    const handleFilterBoardUpdate = async(data, result) => {
        let clone = structuredClone(tasks)

        clone[result.source.droppableId].tasks = [
            ...clone[result.source.droppableId].tasks.filter((task) =>
                task.id !== result.draggableId
            ),
        ]

        clone[result.destination.droppableId].tasks = [
            ...clone[result.destination.droppableId].tasks,
            ...data[result.destination.droppableId].tasks
        ]
        await updateBoard(id, clone)
        setTasks(clone)

        // todo update board only after the user is done filtering 
        // but update the search results so data is consistant and moves when a 
        // user drags a task while in the filtered state
    }

    const handleOrderUpdate = async(keys) => {
        await updateColumnKeys(id, keys)
        setKeys(keys)
    }

    const handleRemoveColumn = async (name) => {
        const clone = structuredClone(tasks)
        delete clone[name]

        try {
            await handleOrderUpdate(Object.keys(clone))
            await handleBoardUpdate(clone)
        } catch (error) {
            console.log(error)
        }

    }

    const handleTaskUpdate = async (
        id,
        task,
        labels,
        description,
        columnName
    ) => {
        console.log(description, columnName)
        const clone = structuredClone(tasks)
        const taskToBeupdate = clone[columnName].tasks.find((task) => task.id === id)
        taskToBeupdate.task = task
        taskToBeupdate.labels = labels
        taskToBeupdate.description = description

        try {
            await handleBoardUpdate(clone)
        } catch (error) {
            console.log(error)
        }
    }

    
    const handleColumnUpdate = async(original, newColumn, description, color) => {
        var dataClone = structuredClone(tasks)

        if (original !== newColumn) {
            delete Object.assign(dataClone, {
                [newColumn]: {
                    columnColor: color,
                    description: description,
                    tasks: dataClone[original].tasks,
                }
            })[original]

        }
        else {
            Object.assign(dataClone, {
                [original]: {
                    columnColor: color,
                    description: description,
                    tasks: dataClone[original].tasks,
                }
            })[original]
        }

        try {
            setTasks(dataClone)
            setKeys(Object.keys(dataClone))
            await handleBoardUpdate(dataClone)
            await handleOrderUpdate(Object.keys(dataClone))
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveTask = useCallback(async (column, task) => { 
        const data = structuredClone(tasks)
        const removed = data[column].tasks.findIndex((t) => t.id === task)
        data[column].tasks.splice(removed, 1)
        try {
            await handleBoardUpdate(data)
        } catch (error) {
            console.log(error)
        }
    }, [tasks])

    const handleAddTask = async (task, labels, columnName) => {
        if (!task.trim()) return
        var data = structuredClone(tasks)

        data[columnName].tasks.push(
            { 
                task: task, 
                id: crypto.randomUUID(), 
                labels: labels,
                dateAdded: new Date().toLocaleDateString(),
                description: "",
            }
        )

        try {
            await handleBoardUpdate(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddColumn = async(columnName, description, color) => {
        var clone = structuredClone(tasks)
        clone = Object.assign({
            [columnName]: {
                columnColor: color,
                description: description,
                tasks: [],
            }
        }, clone)

        try {
            await handleBoardUpdate(clone)
            await handleOrderUpdate(Object.keys(clone))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDragEnd = async (result) => {
        if(result.combine) {
            if(result.type === "COLUMN") {
                const shallowCopy = [...keys]
                shallowCopy.splice(result.source.index, 1)
                setKeys(shallowCopy)
                return
            }

            const column = tasks[result.source.droppableId]
            const withTaskRemoved = [...column]

            withTaskRemoved.splice(result.source.index, 1)

            const orderedTasks = {
                ...tasks,
                [result.source.droppableId]: withTaskRemoved
            }
            setTasks(orderedTasks)
        }

        // dropped no where
        if (!result.destination) {return}

        const source = result.source
        const destination = result.destination

        // did not move anywhere can break early
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {return}

        // reordering columns
        if (result.type === "COLUMN") {
            const reorderedOrder = reorder(keys, source.index, destination.index)
            handleOrderUpdate(reorderedOrder)
            setKeys(reorderedOrder);
            return;
        }
    
        // reordering tasks
        const data = reorderMap({
            tasks: filtered !== null ? filtered : tasks,
            source,
            destination,
        })
        
        if (filtered === null) {
            setTasks(data.tasks)
            handleBoardUpdate(data.tasks)
        } else {
            setFiltered(data.tasks)
            handleFilterBoardUpdate(data.tasks, result)
        }
    }

    return (
        <>
            <Box>
                <Searchbar 
                    data={tasks}
                    setFilteredData={setFiltered}
                />
            </Box>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                    droppableId={id}
                    type="COLUMN"
                    direction="horizontal"
                >
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                                height: '100%',
                                maxHeight: {xs:"86%", md: "86%"},
                                display: "flex",
                                flexDirection: {
                                    xs:"column",
                                    md: "row"
                                },
                                flex: "1, 1, auto",
                                position: "fixed",
                                bottom: '5px',
                                overflowX: {xs: "hidden", md: "auto"},
                                overflowY: {xs: "auto",  md:"hidden"},
                                width: "100%",
                            }}>

                            {keys.map((key, index) => (
                                <Column
                                    edit={canEdit || globalEdit || owner}
                                    key={key}
                                    columnName={key}
                                    data={filtered !== null ? filtered[key] : tasks[key]}
                                    index={index}
                                    labels={labels}
                                    handleAddTask={handleAddTask}
                                    handleRemoveColumn={handleRemoveColumn}
                                    handleRemoveTask={handleRemoveTask}
                                    handleColumnUpdate={handleColumnUpdate}
                                    handleTaskUpdate={handleTaskUpdate}
                                    setFilteredData={setFiltered}
                                />
                            ))}
                            {provided.placeholder}
                            {canEdit ? <AddColumn
                                addColumn={handleAddColumn}
                            /> : <></>}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}
