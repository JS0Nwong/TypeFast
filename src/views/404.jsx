import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Error() {
  return (
    <>
      <Box sx={{
        display: "flex", 
        flexDirection: "row", 
        height: '100dvh',
      }}>
            <Box sx={{
                width: { sm: "0%", md: '25%' },
            }}></Box>
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
            <Box sx={{
                width: { sm: "0%", md: '25%' },
            }}>

            </Box>
        </Box>
    </>
)
}
