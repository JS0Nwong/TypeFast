import { useMemo, useContext } from 'react'
import { Box } from "@mui/material"

import { ThemeContext } from "../hooks/useTheme"
import Caret from "./Carets/Caret"
import { useBoundStore } from '../utils/stores/boundStore';

export default function UserInputDisplay({ charsTyped }) {
    const char = useMemo(() => {
        return charsTyped?.split('');
    }, [charsTyped]);

    const theme = useContext(ThemeContext)

    return (
        <Box>
            
        </Box>
    )
}
