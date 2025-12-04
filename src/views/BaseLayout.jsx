import { Box } from "@mui/material"

import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Gutter from "../components/static/Gutter"

export default function BaseLayout({ children }) {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Gutter />
                <Box sx={{
                    maxWidth: { sm: "100%", md: "1440px" },
                    width: "100%",
                    height: '100dvh',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Header />
                    {children}
                    <Footer />
                </Box>
                <Gutter />
            </Box>
        </>
    )
}
