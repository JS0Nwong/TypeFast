import { Box, Typography, Button } from '@mui/material'
import useFirebase from '../../hooks/useFirebase'
import { useSearchParams } from 'react-router-dom'

export default function LobbyPlayerOptions() {
    const { leaveGameRoom } = useFirebase()

    const [searchParams] = useSearchParams()
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '100%',

        }}>
            <Typography textAlign='center' sx={{ width: '100%' }}>
                Waiting for host to start...
            </Typography>
            <Button
                variant='contained'
                sx={{
                    p: 1
                }}
                onClick={() => leaveGameRoom(searchParams.get('room'))}
            >
                Leave
            </Button>
        </Box>
    )
}
