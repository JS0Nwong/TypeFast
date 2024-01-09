import { useEffect, useState } from 'react'

import { Box } from '@mui/material'

import BoardListCard from './components/BoardsListViewComponents/BoardListCard'
import CreateBoard from './components/BoardsListViewComponents/CreateBoard'

import useStore from './store'
import useFirebaseHooks from "./utils/firebaseHooks"

export default function BoardListView() {
    const [loading, setLoading] = useState(true)
    const { getBoards } = useFirebaseHooks()
    const { boards, areBoardsFetched } = useStore()

    useEffect(() => {
        if (!areBoardsFetched) getBoards(setLoading)
        else setLoading(false)
    }, [])

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: 'row' },
                m: { xs: 1, md: 0 },
                height: "100%",
                flexWrap: 'wrap'
            }}>
                <CreateBoard />
                {boards.map((board, index) => (
                    <BoardListCard data={board} key={board.id} id={board.id}/>
                ))}
            </Box>
        </>
    )
}
