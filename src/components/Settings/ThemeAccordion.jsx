import { useContext } from 'react'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Stack,
    Button,
    Box,
} from "@mui/material"
import PaletteIcon from '@mui/icons-material/Palette';

import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from '../../hooks/useTheme';

import PresetThemes from './PresetThemes';
import ThemePicker from './ThemePicker';
import useThemeStore from '../../utils/stores/themeStore'
import { useThemeStoreActions } from '../../utils/stores/themeStore';

export default function ThemeAccordion() {
    const { toggleTheme } = useContext(ThemeContext)
    const {
        toggleCustom
    } = useThemeStore()
    const { setToggleCustom } = useThemeStoreActions()
    const {
        closeTheme,
        setCloseTheme,
    } = useClientSettings()
    const handleSetCustomTheme = () => {
        toggleTheme('custom')
        setToggleCustom(true)
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
                    justifyContent: 'space-between', 
                }}>
                    <Typography 
                        sx={{display: 'flex', alignItems: 'center', opacity: 0.45}}>
                            <PaletteIcon sx={{mr: 1}}/>
                            theme
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Button
                            variant='contained'
                            onClick={() => setToggleCustom(false)}
                            sx={{ mr: 1, pl: 2, pr: 2, opacity: toggleCustom ? 0.45 : 1}}
                        >preset</Button>
                        <Button
                            variant='contained'
                            onClick={() => handleSetCustomTheme()}
                            sx={{ mr: 1, pl: 2, pr: 2, opacity: toggleCustom ? 1 : 0.45 }}
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
                    {toggleCustom ?  <ThemePicker /> :<PresetThemes />}
                </Stack>
            </AccordionDetails>
        </Accordion>

    )
}