import { useState } from "react";
import { Box, Button } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import { useBoundStore } from '../../utils/stores/boundStore';
import { generate } from "random-words";
import CustomTestSettingsDialog from './CustomTestSettingsDialog';

const wordValues = [10, 25, 50, 100]

export default function WordOptions() {
    const {
        customTest,
        wordsAmount,
        setWordsAmount,
        setText,
        setUserStatus,
        setInputFocus,
    } = useBoundStore((state) => ({
        customTest: state.customTest,
        wordsAmount: state.wordsAmount,
        setWordsAmount: state.setWordsAmount,
        setText: state.setText,
        setUserStatus: state.setUserStatus,
        setInputFocus: state.setInputFocus,
    }))

    const [customSettingsDialog, setCustomSettingsDialog] = useState(false)
    
    const handleWordAmountChange = (value) => {
        setWordsAmount(value)
    }
    const handleDialogOpen = () => {
        setCustomSettingsDialog(true)
        setUserStatus('searching')
        setInputFocus(false)
    }
    const handleDialogClose = () => {
        setCustomSettingsDialog(false)
        setUserStatus('ready')
        setInputFocus(true)
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "space-evenly",
            }}>
                {wordValues.map((value) =>
                    <Button variant="text" key={value} sx={{
                        padding: 0,
                        minHeight: 0,
                        minWidth: 0,
                        mr: 1,
                        ml: 2,
                        opacity: wordsAmount === value ? 1 : 0.55
                    }}
                        onClick={() => handleWordAmountChange(value)}
                    >
                        {value}
                    </Button>
                )}
                <Button sx={{
                    padding: 0,
                    minHeight: 0,
                    minWidth: 0,
                    mr: 1,
                    ml: 1,
                    opacity: customTest ? 1 : 0.55
                }}
                    onClick={() => handleDialogOpen()}
                >
                    <TuneIcon />
                </Button>
            </Box>
            {customSettingsDialog && 
                <CustomTestSettingsDialog 
                    open={customSettingsDialog} 
                    onClose={() => handleDialogClose()} 
                />}
        </>
    )
}
