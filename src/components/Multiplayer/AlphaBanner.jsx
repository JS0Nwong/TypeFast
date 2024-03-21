import { Box, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

export default function AlphaBanner() {
    return (
        <Box sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            background: "rgba(0,0,0,0.5)",
            p: 2,
            width: "370px",
            borderRadius: '6px'
        }}>
            <InfoIcon sx={{ position: 'absolute'}} />
            <Typography sx={{ pl: 4 }}>
                Multiplayer is in alpha stages. 
                Expect many bugs when playing multiplayer games. 
                Please report any bugs to the <a href="https://github.com/JS0Nwong/TypeFast">GitHub</a>.
            </Typography>
        </Box>
    )
}
