import { useMemo, useContext } from 'react'
import { Box } from "@mui/material"
import Character from './Character';
import { ThemeContext } from "../hooks/useTheme"

export default function UserInputDisplay({ charsTyped }) {
    const char = useMemo(() => {
        return charsTyped.split('');
    }, [charsTyped]);

    const theme = useContext(ThemeContext)

    return (
        <Box>
            {char.map((_, index) => {
                return (<Character
                    key={index}
                    char={charsTyped.charAt(index)}
                    correctColor={theme.theme.palette.text.primary}
                    incorrectColor={theme.theme.palette.text.error}
                />
                )
            })
            }
        </Box>
    )
}
