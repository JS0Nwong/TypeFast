import React from 'react'
import { Box, Button, IconButton, Typography, Divider } from '@mui/material'
import {
    SunIcon,
    MoonIcon,
    CaretLeftIcon,
    CaretRightIcon,
    HomeIcon,
    GearIcon,
    LayoutIcon
} from "@radix-ui/react-icons";

export default function Menubar() {
    return (
        <Box sx={{
            m: 1,
            border: "1px solid rgba(229, 229, 229, 0.25)",
            borderRadius: '4px',
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {/* Project Info */}
            <Box>
                <Typography
                    variant='h6'
                    fontWeight="600"
                    fontSize="1.7rem"
                    sx={{
                        textAlign: 'center',
                        ml: 1,
                        mr: 1,
                    }}>
                    asdsd
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <CaretLeftIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>
                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <HomeIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>
                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <CaretRightIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(229, 229, 229, 0.25)', mt: 1, mb: 1, mr: 0.5, ml: 0.5 }} />

                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <LayoutIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>
                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <SunIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>
                <IconButton sx={{
                    borderRadius: "5px",
                    m: 1,
                    border: '1px solid  rgba(82, 82, 82, 1)'
                }}>
                    <GearIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                </IconButton>
            </Box>
        </Box>
    )
}
