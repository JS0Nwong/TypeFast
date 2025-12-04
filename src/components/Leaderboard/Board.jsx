import { Box, Typography, Tabs, Tab, Pagination } from "@mui/material"
import { useMemo, useState } from "react"
import chunk from "lodash/chunk"
import Alltime from "./Alltime"
import Daily from "./Daily"
import PlayerList from "./PlayerList"

export default function Board() {
    const players =
    [
        { id: 1, username: 'Player 1', stats: '100' },
        { id: 2, username: 'Player 2', stats: '900' },
        { id: 11, username: 'Player 11', stats: '9' },
        { id: 12, username: 'Player 12', stats: '8' },
        { id: 13, username: 'Player 13', stats: '7' },
        { id: 14, username: 'Player 14', stats: '6' },
        { id: 15, username: 'Player 15', stats: '5' },
        { id: 16, username: 'Player 16', stats: '4' },
        { id: 17, username: 'Player 17', stats: '3' },
        { id: 18, username: 'Player 18', stats: '2' },
        { id: 19, username: 'Player 19', stats: '1' },
        { id: 20, username: 'Player 20', stats: '0' },
    ]

    const topThree = players.slice(0, 3)
    const restOfPlayers = players.slice(3, players.length)

    const [tabIndex, setTabIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [chunkSize, setChunkSize] = useState(4)
    const renderLimit = useMemo(() => chunk(players, chunkSize), [players, chunkSize])

    const handleTabChange = (e, value) => {
        setTabIndex(value)
    }

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4">Leaderboard</Typography>
                <Tabs
                    value={tabIndex}
                    sx={{ mt: 2 }}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    <Tab value={0} label="All time" />
                    <Tab value={1} label="Daily" />
                </Tabs>
                {currentPage !== 0 ? <></> : <Alltime value={tabIndex} index={0} topThree={topThree}/>}
                {currentPage !== 0 ? <></> : <Daily value={tabIndex} index={1} />}
            </Box>
            <PlayerList
                setChunkSize={setChunkSize}
                setCurrentPage={setCurrentPage}
                renderLimit={renderLimit}
                currentPage={currentPage}
                players={restOfPlayers}
            />
        </Box>
    )
}
