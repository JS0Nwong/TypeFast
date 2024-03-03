import {
    Box,
    styled,
    Typography,
    Chip,
} from '@mui/material'
import { useState } from 'react';
import EnterRoomCode from './EnterRoomCode';

import useFirebase from "../../hooks/useFirebase"
import LockIcon from '@mui/icons-material/Lock';

export default function MPGameInfo({ lobby }) {
    const GameInfo = styled('div', {
        name: "MuiGameInfo",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;
    const { joinGameRoom } = useFirebase()

    const [customSettingsDialog, setCustomSettingsDialog] = useState(false)
    const handleDialogOpen = () => {
        setCustomSettingsDialog(true)
    }

    const handleRedirect = () => {
        !lobby.roomPrivacy ? handleDialogOpen() : joinGameRoom(lobby.id)
    }

    return (
        <>
            <GameInfo>
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: 'space-between',
                }}
                    onClick={handleRedirect}
                >
                    <Typography>
                        Room
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "row",
                        alignItems: 'center'
                    }}>
                        <Typography sx={{ mr: 1 }}>
                            {lobby.players.length}/{lobby.maxPlayers}
                        </Typography>
                        {!lobby.roomPrivacy ? <LockIcon /> : <></>}
                    </Box>
                </Box>
            </GameInfo>
            {customSettingsDialog && <EnterRoomCode />}
        </>
    )
}
