const useReorder = () => {
    // reordering columns
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);      
        return result;
      };

    // reordering tasks 
    const reorderMap = ({tasks, source, destination}) => {
        const current = [...tasks[source.droppableId].tasks]
        const next = [...tasks[destination.droppableId].tasks]
        const target = current[source.index]

        // // moving to same column
        if(source.droppableId === destination.droppableId) {
            const reordered = reorder(current, source.index, destination.index)
            const res = {
                ...tasks,
                [source.droppableId]: {
                    ...tasks[source.droppableId],
                    tasks: [...reordered]
                }
            }
            return {
                tasks: res
            }
        }

        // moving to different column

        current.splice(source.index, 1)
        next.splice(destination.index, 0, target)

        const res = {
            ...tasks,
            [source.droppableId]: {
                ...tasks[source.droppableId],
                tasks: [...current]
            },
            [destination.droppableId]: {
                ...tasks[destination.droppableId],
                tasks: [...next]
            }
        }
        return {
            tasks: res
        }
    }

    // moving tasks to a different column
    const moveBetween = ({
        column,
        column2,
        source,
        destination
    }) => {
        const newFirst = Array.from(column.values)
        const newSecond = Array.from(column2.values)

        const moveFrom = source.droppableId === column.id ? newFirst : newSecond
        const moveTo = moveFrom === newFirst ? newSecond : newFirst

        const [moved] = moveFrom.splice(source.index, 1)
        moveTo.splice(destination.index, 0, moved)

        return {
            column: {
                ...column,
                values: newFirst,
            },
            column2: {
                ...column2,
                values: newSecond,
            }
        }
    }

    return {reorder, reorderMap, moveBetween}
}

export default useReorder