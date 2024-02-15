import { useState } from "react";
import { Box, Button } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import { useBoundStore } from '../../utils/stores/boundStore';
import CustomTestSettingsDialog from './CustomTestSettingsDialog';

const timeValues = [15, 30, 60, 120]

export default function TimeOptions() {
    const {
        customTest,
        time,
        setTime,
        setUserStatus,
        setInputFocus,
    } = useBoundStore((state) => ({
        customTest: state.customTest,
        time: state.time,
        setTime: state.setTime,
        setUserStatus: state.setUserStatus,
        setInputFocus: state.setInputFocus,
    }))

    
    const [customSettingsDialog, setCustomSettingsDialog] = useState(false)
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
                {timeValues.map((value) =>
                    <Button variant="text" key={value} sx={{
                        padding: 0,
                        minHeight: 0,
                        minWidth: 0,
                        mr: 1,
                        ml: 2,
                        opacity: time === value ? 1 : 0.55
                    }}
                        onClick={() => setTime(value)}
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
