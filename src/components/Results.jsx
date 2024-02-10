import { useContext } from "react"
import { Box, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { motion } from "framer-motion"
import FeedbackSnackbar from "./FeedbackSnackbar";

import useScreenCapture from '../hooks/useScreenCapture';
import { ThemeContext } from "../hooks/useTheme"
import { useBoundStore } from "../utils/stores/boundStore";
import { useUpdateHistory } from '../utils/stores/store';

export default function Results() {
    const {
        rawKeysPerMinute,
        selectedTime,
        rawWpm,
        history,   
        userInputWordHistory,   
        hideElements,  
        nextTest,
        repeatTest,
        unhideElements,
        setSnackbar,
    } = useBoundStore((state) => ({
        rawKeysPerMinute: state.rawKeysPerMinute,
        rawWpm: state.rawWpm,
        selectedTime: state.selectedTime,
        userInputWordHistory: state.userInputWordHistory,
        history: state.history,
        hideElements: state.hideElements,
        nextTest: state.nextTest,
        repeatTest: state.repeatTest,
        unhideElements: state.unhideElements,
        setSnackbar: state.setSnackbar,
    }))

    const totalChars = Object.values(history).length
    const charsCorrect = Object.values(history).reduce((v, item) => v + (item === true ? 1 : 0), 0)
    const charsIncorrect = totalChars - charsCorrect
    const extraChars = Object.values(history).reduce((count, item) => count + (typeof item === 'number' ? item : 0), 0)

    const { wordsCorrect, wordsIncorrect, resetHistory } = useUpdateHistory()
    const { capture } = useScreenCapture()
    const { theme } = useContext(ThemeContext)

    const handleScreenshot = async () => {
        unhideElements()
        setTimeout(async () => {
            await capture().then((res) => (
                res ? unhideElements() : unhideElements()
            ))
            setSnackbar('Sucessfully copied screenshot to clipboard!')
        }, 350)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, ease: 'easeOut' }}
            transition={{ delay: 0.2, ease: 'easeInOut' }}
        >
            <FeedbackSnackbar />
            <Box
                sx={{
                    height: '100%',
                    width: "100%",
                    p: 4,
                    transition: '0.15s ease',
                    flexDirection: "column",
                    background: theme.palette.background.main
                }}
                id="results"
            >
                <Stack direction="row" spacing={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                        }}>
                        <Typography variant='h4' sx={{ opacity: ".65" }}>wpm</Typography>
                        <Tooltip 
                            title={
                                (rawWpm * 
                                    (wordsCorrect.size / 
                                    (wordsCorrect.size + wordsIncorrect.size)
                                    )
                                ).toPrecision(4) ?? 0 + ' wpm'
                        }>
                        <Typography variant='h2'>
                            {Math.floor(
                                rawWpm * (wordsCorrect.size / (wordsCorrect.size + wordsIncorrect.size)))
                            ?? 0}
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
                                            {totalChars}/
                                            {charsCorrect}/
                                            {charsIncorrect}/
                                            {extraChars}/
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

                <Stack direction='row' sx={{ mt: 5, justifyContent: 'center', opacity: hideElements ? 0 : 1 }}>
                    <Tooltip title="next test">
                        <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0} onClick={() => {
                            nextTest()
                            resetHistory()
                        }}>
                            <NavigateNextIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="repeat test">
                        <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0} onClick={() => {
                            repeatTest()
                            resetHistory()
                        }}>
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="copy screenshot to clipboard">
                        <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0} onClick={() => handleScreenshot()}>
                            <PanoramaIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </motion.div>
    )
}
