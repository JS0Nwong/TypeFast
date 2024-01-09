import React from 'react'
import { Box, Stack, styled, Divider } from '@mui/material'

export default function MultiplayerMenuBar() {
  const MenuBox = styled("div", {
    name: "MuiDiv",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
      }}>
        <MenuBox
          sx={{
            borderRadius: "4px",
            p: 0.5,
            width: "864px",
          }}>
          <Stack
            direction='row'
            spacing='auto'
            divider={<Divider orientation="vertical" flexItem />}
          >

          </Stack>
        </MenuBox>
      </Box>

    </>
  )
}
