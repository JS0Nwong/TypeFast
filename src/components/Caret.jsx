import React from 'react'
import { styled } from '@mui/material'

export default function Caret() {
  const Caret = styled("div", {
    name: "MuiCaret",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;
  return (
    <Caret sx={{
      transition: "0.15s ease-in-out",
      animation: '1s infinite ease blinking-cursor',
      '@keyframes blinking-cursor': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
      }
    }}/>
  )
}
