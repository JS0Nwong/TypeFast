import React from 'react'
import { Box, Typography, Tabs, Tab } from "@mui/material"

export default function Daily(props) {
  const { value, index } = props

    return (
        <Box
            hidden={value !== index}
            role="tabpanel"
            sx={{
                background: 'blue'
            }}>
            asdasdasdas
        </Box>
    )
}
