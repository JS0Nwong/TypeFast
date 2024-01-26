import React from 'react'
import { Box, Typography, } from "@mui/material"

export default function About() {
    return (
        <>
            <Box sx={{
                height: "100%",
                display: 'flex',
                flexDirection: 'column',
                width: "100%",
                mt: 6,
            }}>
                <Box>
                    <Typography variant='h4'>about</Typography>
                    <Typography sx={{mt: 1}}>
                        type.fast is a minimalistic, highly customizable typing test inspired by monkeytype.
                    </Typography>
                </Box>
                <Box sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant='h4'>features</Typography>
                    <Typography variant='h6' sx={{mt: 1, opacity: ".5"}}>
                        word set
                    </Typography>
                    <Typography>
                        By default, this website uses the most common 200 words in 
                        the English language to generate its tests. You can change to an 
                        expanded set (1000 most common words) in the options, or change 
                        the language entirely.
                    </Typography>
                </Box>
                <Box sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant='h4'>credits & acklodgements</Typography>
                    <Typography sx={{mt: 1}}>
                        @monkeytype
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
