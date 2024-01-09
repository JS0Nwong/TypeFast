import {useContext} from 'react'
import {
    Box,
    ListItemText,
    ListItemButton,
} from '@mui/material'
import { ThemeContext } from '../hooks/useTheme';
import { themes } from "../static/themes/themes.json"

export default function ThemeButton({theme}) {
    const { webTheme, toggleTheme } = useContext(ThemeContext)
    const handleThemeChange = (theme) => {
        toggleTheme(theme)
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
                background: webTheme === theme ? themes[theme].backgroundSecondary : 'none'
            }}
            onClick={() => handleThemeChange(theme)}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                p: 0.5,
                ml: 1,
                borderRadius: "999px",
                background: themes[theme].backgroundPrimary
            }}>
                <Box sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "99px",
                    mr: 0.5,
                    background: themes[theme].backgroundSecondary
                }}>

                </Box>
                <Box sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "99px",
                    background: themes[theme].textPrimary
                }}>

                </Box>
                <Box sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "99px",
                    background: themes[theme].textSecondary,
                    ml: 0.5,
                }}>
                </Box>
            </Box>
            <ListItemText
                primary={theme}
                sx={{
                    width: "100%",
                    textAlign: "end"
                }}
            />
        </ListItemButton>
    )
}
