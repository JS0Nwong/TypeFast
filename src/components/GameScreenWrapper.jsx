import { Box, Button } from "@mui/material"
import TypeDisplay from './TypeDisplay'
import UserInputDisplay from './UserInputDisplay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import TimeDisplay from './TimeDisplay';
import useStore from '../utils/store';

export default function GameScreenWrapper() {
    const { mode, text, regenerateText, currentUserInput, hideElements } = useStore()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: "column",
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 10,
            height: "100%",    
            position: 'relative',
        }}>
            <TimeDisplay />
            {mode !== 'zen' ?
                <TypeDisplay
                    words={text}
                />
                : <UserInputDisplay
                    words={text}
                    charsTyped={currentUserInput}
                />}
            <Button
                sx={{opacity: hideElements ? "0" : "1"}}
                onClick={regenerateText}
            >
                <RestartAltIcon />
            </Button>
        </Box>
    )
}
