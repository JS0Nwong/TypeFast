import React from 'react'
import { Box, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { motion } from "framer-motion"
import useStore from '../utils/store';
import { useUpdateHistory } from '../utils/store';

export default function Results() {
    const {
        rawKeysPerMinute,
        wordsPerMinute,
        wordAccuracy,
        charAccuracy,
        nextTest,
        repeatTest,
        selectedTime,
        rawWpm,
    } = useStore()

    const { wordsCorrect, wordsIncorrect, resetHistory } = useUpdateHistory()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, ease: 'easeOut' }}
            transition={{ delay: 0.2, ease: 'easeInOut' }}
        >
            <Box
                sx={{
                    height: '100%',
                    width: "100%",
                    p: 4,
                    transition: '0.15s ease',
                    flexDirection: "column",
                }}>
                <Stack direction="row" spacing={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                        }}>
                        <Typography variant='h4' sx={{ opacity: ".65" }}>wpm</Typography>
                        <Tooltip 
                            title={
                                (rawWpm * (wordsCorrect.size / (wordsCorrect.size + wordsIncorrect.size))).toPrecision(4) + ' wpm'
                        }>
                        <Typography variant='h2'>
                            {Math.floor(
                                rawWpm * (wordsCorrect.size / (wordsCorrect.size + wordsIncorrect.size)))
                            }
                        </Typography>
                        </Tooltip>
                        <Typography variant='h4' sx={{ opacity: ".65" }}>acc</Typography>
                        <Tooltip 
                            title={
                                (wordsCorrect.size / (wordsCorrect.size + wordsIncorrect.size) * 100).toPrecision(4) + '%'
                        }>
                            <Typography variant='h2'>
                                {Math.ceil(wordsCorrect.size / (wordsCorrect.size + wordsIncorrect.size) * 100)}%
                            </Typography>
                        </Tooltip>
                        <Typography variant='h4' sx={{ opacity: ".65", fontSize: '1.2rem' }}>test type</Typography>
                        <Typography variant='body2'>time {selectedTime}s</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Box sx={{width: "100%", height: "100%", mb: 1}}>
                            
                        </Box>
                        <Box>
                            <Stack direction='row' spacing={5}>
                                <Box> 
                                    <Typography variant='subtitle1' sx={{ opacity: ".65" }}>raw</Typography>
                                    <Tooltip title={rawWpm.toPrecision(4) + ' wpm'}>
                                        <Typography sx={{mt: 0.5, fontSize: '2rem'}}>{Math.floor(rawWpm)}</Typography>
                                    </Tooltip>
                                </Box>
                                <Box> 
                                    <Typography variant='subtitle1' sx={{ opacity: ".65" }}>characters</Typography>
                                    <Tooltip title={'total/correct/incorrect/extra/missed'}>
                                        <Typography sx={{ mt: 0.5, fontSize: '2rem' }}>
                                            {rawKeysPerMinute}/{}/{}/{}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                <Box> 
                                    <Typography variant='subtitle1' sx={{ opacity: ".65" }}>time</Typography>
                                    <Typography sx={{mt: 0.5, fontSize: '2rem'}}>{selectedTime}s</Typography>
                                </Box>
                            </Stack>
                        </Box>

                    </Box>
                </Stack>

                <Stack direction='row' sx={{ mt: 3, justifyContent: 'center' }}>
                    <Tooltip title="next test">
                        <IconButton sx={{ mr: 5, ml: 5 }} onClick={() => {
                            nextTest()
                            resetHistory()
                        }}>
                            <NavigateNextIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="repeat test">
                        <IconButton sx={{ mr: 5, ml: 5 }} onClick={() => {
                            repeatTest()
                            resetHistory()
                        }}>
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="copy screenshot to clipboard">
                        <IconButton sx={{ mr: 5, ml: 5 }}>
                            <PanoramaIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </motion.div>
    )
}
