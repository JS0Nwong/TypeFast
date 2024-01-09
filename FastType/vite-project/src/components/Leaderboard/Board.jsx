import { Box, Typography, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import Alltime from "./Alltime"
import Daily from "./Daily"

export default function Board() {
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (e, value) => {
        setTabIndex(value)
    }

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4">Leaderboard</Typography>
                <Tabs
                    value={tabIndex}
                    sx={{ mt: 2 }}
                    onChange={handleTabChange}
                >
                    <Tab value={0} label="All time">
                        <Alltime />
                    </Tab>
                    <Tab value={1} label="Daily">
                        <Daily />
                    </Tab>
                </Tabs>
            </Box>
        </Box>
    )
}
