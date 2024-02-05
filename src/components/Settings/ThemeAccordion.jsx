import { useContext, useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Stack,
    Button,
    Box,
} from "@mui/material"
import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from '../../hooks/useTheme';

import PresetThemes from './PresetThemes';
import ThemePicker from './ThemePicker';

export default function ThemeAccordion() {
    const [presetTheme, setPresetTheme] = useState(true)
    const { toggleTheme } = useContext(ThemeContext)
    const {
        closeTheme,
        setCloseTheme,
    } = useClientSettings()
    const handleSetCustomTheme = () => {
        toggleTheme('custom')
        setPresetTheme(false)
    }
    return (
        <Accordion
            expanded={closeTheme}
            onChange={() => setCloseTheme(!closeTheme)}
        >
            <AccordionSummary id={"theme"}>
                <Typography variant='h3'>theme</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography>theme</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Button
                            variant='contained'
                            onClick={() => setPresetTheme(true)}
                            sx={{ mr: 1, pl: 2, pr: 2 }}
                        >preset</Button>
                        <Button
                            variant='contained'
                            onClick={() => handleSetCustomTheme()}
                            sx={{ mr: 1, pl: 2, pr: 2 }}
                        >custom</Button>
                    </Box>
                </Box>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                        mt: 5,
                        width: '100%'
                    }}>
                    {presetTheme ? <PresetThemes /> : <ThemePicker />}
                </Stack>
            </AccordionDetails>
        </Accordion>

    )
}