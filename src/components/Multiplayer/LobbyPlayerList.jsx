import {
    Box,
    Typography,
    Button,
} from '@mui/material'
import { PiCrownFill } from "react-icons/pi";

import Grid from '@mui/material/Unstable_Grid2'
import {auth } from '../../configs/firebase'

export default function LobbyPlayerList({ data }) {
    return (
        <>
            <Box sx={{
                mt: 2,
                width: '100%',
                height: '100%',
            }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{
                        xs: 1,
                        sm: 2,
                        md: 0,
                    }}
                    sx={{
                        maxWidth: "100%"
                    }}>
                    {
                        data.players.length > 0
                            ? data?.players.map((player, index) => (
                                <Grid xs={4} key={index}>
                                    {
                                        auth.currentUser.displayName === player.name
                                            ? <Typography
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >   
                                                {player.name} (You)
                                                {data.roomOwner === player.id ? <PiCrownFill style={{ marginLeft: '0.5rem' }} /> : null}
                                            </Typography>
                                            : <Typography  sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                {player.name} 
                                                {data.roomOwner === player.id ? <PiCrownFill style={{ marginLeft: '0.5rem' }} /> : null}
                                            </Typography>
                                    }
                                </Grid>
                            ))
                            : <Typography>No players found</Typography>
                    }
                </Grid>
            </Box>
        </>
    )
}
