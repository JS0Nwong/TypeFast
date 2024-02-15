import { Box } from "@mui/material"
import { motion } from "framer-motion"

import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Board from "../components/Leaderboard/Board"
import Gutter from "../components/static/Gutter"

export default function Leaderboard() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, ease: 'easeOut' }}
        transition={{ delay: 0.2, ease: 'easeInOut' }}
      >
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
            <Board />

            <Footer />
          </Box>
          <Gutter />
        </Box>
      </motion.div>
    </>
  )
}
