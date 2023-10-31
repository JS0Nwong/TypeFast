import React from 'react'
import { Box, Button, Link } from '@mui/material'

const locations = [
    {
        name: 'Home',
        location: "/"
    },
    {
        name: 'About',
        location: "/about"
    },
    {
        name: 'Works',
        location: "/works"
    },

]

export default function Navbar() {
    return (
        <>
            <Box
                className="navbar"
                sx={{
                    width: "300px",
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md:"flex",
                    },
                    flexDirection: "row",
                    justifyContent: "space-around",
                    bottom: 70,
                    p: 1,
                }}>
                {locations.map((location, key) => (
                    <Button
                        disableRipple
                        variant='text'
                        className="nav-button"
                        sx={{
                            p: 1,
                        }}
                        key={key}
                    >   
                        <Link 
                            href={location.location}
                            sx={{
                                textDecoration: 'none',
                                color: "#FFF",
                                position: "relative",
                                "&::after": {
                                    position: "absolute",
                                    content: "none",
                                    background: "red",
                                    height: '9px',
                                    width: "100%",
                                    bottom: "-4px",
                                }
                            }}
                        >
                        {location.name}
                        </Link>
                    </Button>
                ))}
            </Box>
        </>
    )
}
