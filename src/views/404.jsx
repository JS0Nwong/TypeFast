import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Gutter from '../components/Gutter'

export default function Error() {
  return (
    <>
      <Box sx={{
        display: "flex", 
        flexDirection: "row", 
        height: '100dvh',
      }}>
            <Gutter/>
            <Box sx={{
                maxWidth: { sm: "100%", md: "1440px" },
                width: "100%",
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Header />
                <Typography 
                  variant='h6'
                >
                  404 - Page not found 【=◈︿◈=】
                </Typography>
                <Footer />
            </Box>
            <Gutter/>
        </Box>
    </>
)
}
