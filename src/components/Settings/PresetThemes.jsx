import { useContext } from 'react'
import { themes } from "../../static/themes/themes.json"
import { Button } from '@mui/material'
import { ThemeContext } from '../../hooks/useTheme'

export default function PresetThemes() {
    const themeKeys = Object.keys(themes)

    const { toggleTheme, webTheme, viewValue } = useContext(ThemeContext)

    const handleThemeChange = (e, theme) => {
        e.stopPropagation()
        toggleTheme(theme)
    }

    return (
        themeKeys.map((theme) => {
            return <Button
                key={theme}
                sx={{
                    m: 1,
                    p: 1,
                    width: { 
                        sm: "170px", 
                        md: viewValue === '30%' 
                            ? '250px' 
                            : viewValue === '50%' 
                            ? '260px' 
                            : '310px'
                    },
                    opacity: '1',
                    background: themes[theme]?.backgroundPrimary,
                    color: themes[theme]?.textPrimary,
                    outline: theme === webTheme ? `3px solid ${themes[theme]?.textSecondary}` : "none",
                    '&:hover': {
                        opacity: 1,
                        background: themes[theme]?.backgroundPrimary,
                        transform: "scale(1.1)"
                    },
                    transition: ".15s ease"
                }}
                onClick={(e) => handleThemeChange(e, theme)}
            >{theme}
            </Button>
        })
    )
}
