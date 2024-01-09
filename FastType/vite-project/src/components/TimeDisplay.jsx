import React from 'react'
import { Box, Typography, styled } from "@mui/material"


export default function TimeDisplay({ timeInterval }) {
  const Time = styled("div", {
    name: "MuiDiv",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;


  return (
    <>
      <Time sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        p: 1,
        borderRadius: "4px"
      }}>
        <Typography>
          1:00
        </Typography>
      </Time>
    </>
  )
}
