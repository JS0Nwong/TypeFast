import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import User from '../components/Profile/User'
import Gutter from '../components/Gutter'
import { motion } from "framer-motion"

export default function Profile() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, ease: 'easeOut' }}
        transition={{ delay: 0.2, ease: 'easeInOut' }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Gutter/>
          <Box sx={{
            maxWidth: { sm: "100%", md: "1440px" },
            width: "100%",
            height: '100dvh',
            display: 'flex',
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Header />
            <User />
            <Footer />
          </Box>
          <Gutter/>
        </Box>
      </motion.div>
    </>
  )
}
