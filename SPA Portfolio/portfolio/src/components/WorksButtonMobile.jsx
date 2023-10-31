import React from 'react'
import { Fab, Link } from '@mui/material'
import TerminalIcon from '@mui/icons-material/Terminal';

export default function WorksButtonMobile() {
    return (
        <Link href="/works">
            <Fab 
                color="primary" 
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 20, 
                    right: 20,
                    background: "#EEFC57",
                    display: {
                        xs: 'flex',
                        sm: 'flex',
                        md: 'none',
                    }
                }}
            >
                <TerminalIcon sx={{
                    color: "#000000"
                }}/>
            </Fab>
        </Link>
    )
}
