import React from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Gutter from "../components/static/Gutter"

export default function Error() {

  const ascii = [
    '【=◈︿◈=】',
    '(˃̣̣̥╭╮˂̣̣̥) ✧ ♡ ‧º·˚',
    '(,,Ծ‸Ծ,,)',
    'ᕙ(⇀‸↼‶)ᕗ',
    '✎ (❁ᴗ͈ˬᴗ͈)',
    'ʕ•́ᴥ•̀ʔっ♡',
    '૮꒰ ˶• ༝ •˶꒱ა \̅_̅/̷̚ʾ',
  ]

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        height: '100dvh',
      }}>
        <Gutter />
        <Box sx={{
          maxWidth: { sm: "100%", md: "1440px" },
          width: "100%",
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Header />
          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            height: '100%',
            justifyContent: 'center',
          }}>
            <Typography
              variant='h2'
            >
              {ascii[Math.floor(Math.random() * 7)]}
            </Typography>
            <Typography
              variant='h5'
              fontFamily='League Spartan'
              sx={{
                mt: 5
              }}
            >
              404 - Page not found
            </Typography>
          </Box>
          <Footer />
        </Box>
        <Gutter />
      </Box>
    </>
  )
}
