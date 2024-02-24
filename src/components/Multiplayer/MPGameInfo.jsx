import {
    Box,
    styled,
    Typography,
    Chip,
    Link,
} from '@mui/material'

import { useNavigate, createSearchParams } from 'react-router-dom'
import useFirebase from "../../hooks/useFirebase"

export default function MPGameInfo({ lobby }) {
    const GameInfo = styled('div', {
        name: "MuiGameInfo",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;
    const navigate = useNavigate()
    const { joinGameRoom } = useFirebase()

    const handleRedirect = () => {
        joinGameRoom(lobby.id)
        navigate({
            pathname: '/lobby',
            search: createSearchParams({
                room: lobby.id
            }).toString()
        })
    }

    return (
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
                <Typography>
                    {lobby.players.length}/{lobby.maxPlayers}
                </Typography>
            </Box>
        </GameInfo>
    )
}
