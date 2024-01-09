import { useContext } from 'react'
import {
    Box,
    ListItemText,
    ListItemButton,
} from '@mui/material'
import { ThemeContext } from '../hooks/useTheme';


export default function FontButton({ fontName }) {
    const { font, toggleFont } = useContext(ThemeContext)

    const handleFontChange = (fontName) => {
        let apiURL = []
        apiURL.push('https://fonts.googleapis.com/css?family=')
        apiURL.push(fontName.replace(/ /g, "+"))
        apiURL.push('&display=swap')
        const url = apiURL.join('')
        const fontLink = document.createElement('link')
        fontLink.href = url
        fontLink.rel = "stylesheet"
        document.head.append(fontLink)
        toggleFont(fontName)
    }

    return (
        <ListItemButton
            dense
            disableRipple
            sx={{
                pl: 3,
                pr: 3,
                display: 'flex',
                justifyContent: "space-between",
            }}
            onClick={() => handleFontChange(fontName)}
        >
            <Box>
                <ListItemText
                    sx={{
                        fontFamily: `${fontName}`
                    }}
                    primaryTypographyProps={{ noWrap: true }}
                    primary={'The quick brown fox jumps over the lazy dog'}
                />
            </Box>
            <ListItemText
                primary={fontName}
                primaryTypographyProps={{noWrap: true}}
                sx={{
                    textAlign: 'end',
                    width: "100%",
                    ml: 3,
                }}
            />
        </ListItemButton>
    )
}
