import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import User from '../components/Profile/User'
export default function Profile() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: { sm: "0%", md: '25%' } }} />
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
        <Box sx={{ width: { sm: "0%", md: '25%' } }} />
      </Box>
    </>
  )
}
