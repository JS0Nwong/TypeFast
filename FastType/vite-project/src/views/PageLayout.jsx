import { Box } from "@mui/material"
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PageLayout() {
    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{
                width: { sm: "0%", md: '25%' },
            }}></Box>
            <Box sx={{
                maxWidth: { sm: "100%", md: "1440px" },
                width: "100%",
                height: '100dvh',
                display: 'flex',
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Header />
                <Box sx={{ height: '100%' }} />
                <Footer />
            </Box>
            <Box sx={{
                width: { sm: "0%", md: '25%' },
            }}>
            </Box>
        </Box>
    )
}
