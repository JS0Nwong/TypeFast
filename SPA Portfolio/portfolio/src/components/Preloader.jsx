import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import transition from './Transition'

export default function Preloader({ updateLoading }) {

    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        let currentValue = 0
        function updateCounter() {
            if (currentValue === 100) {
                updateLoading(false)
                return
            }
            currentValue += Math.floor(Math.random() * 10) + 2;

            if (currentValue > 100) {
                currentValue = 100
                updateLoading(false)
            }
            setCounter(currentValue)
            setTimeout(updateCounter, 270)
        }
        updateCounter()
    }, [])

    return (
        <Box sx={{
            height: "100dvh",
            width: "100dvw",
            background: "#111",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 99,
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Divider 
                sx={{
                    backgroundColor: "#EEFC57",
                    width: `${counter + `%`}`,
                }}
            />
            <Typography 
                fontFamily="Fira Code"
                fontWeight='500'
                fontSize="7rem"
                className='counter'>
                {counter}
            </Typography>
        </Box>
    )
}

