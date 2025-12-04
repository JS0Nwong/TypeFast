import { Box, Typography, Tabs, Tab } from "@mui/material"
import TopThree from './TopThree'


export default function Alltime(props) {
    const { value, index, topThree } = props

    return (
        <Box
            hidden={value !== index}
            role="tabpanel"
            sx={{
                width: '100%',
            }}>
            <TopThree topThree={topThree}/>
        </Box>
    )
}
