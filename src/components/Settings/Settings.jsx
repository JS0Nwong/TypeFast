import { useState, useContext } from 'react'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    styled,
    Stack,
    Button
} from "@mui/material"
import PaletteIcon from '@mui/icons-material/Palette';
import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from '../../hooks/useTheme';

import PresetThemes from './PresetThemes';
import ThemePicker from './ThemePicker';

export default function Settings() {
    const [presetTheme, setPresetTheme] = useState(true)
    const { toggleTheme } = useContext(ThemeContext)
    const {
        closeInput,
        closeBehavior,
        closeCaret,
        closeTheme,
        closeApperance,
        setCloseInput,
        setCloseBehavior,
        setCloseCaret,
        setCloseApperance,
        setCloseTheme,
    } = useClientSettings()

    const options = ['behavior', 'input', 'caret', 'theme', 'apperance']
    const Box = styled("div", {
        name: "MuiPanel",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;

    const handleSetCustomTheme = () => {
        toggleTheme('custom')
        setPresetTheme(false)
    }

    return (
        <>
            <Box sx={{
                height: "100%",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                mt: 6,
                overflowY: 'auto',
                maxHeight: '100%',
            }}>
                <Stack direction='row'
                    spacing='auto'
                    sx={{ mb: 2, pl: 3, pr: 3 }}
                >
                    {options.map((option) =>
                        <Button
                            key={option}
                            variant='text'
                            href={`#${option}`}
                            sx={{
                                fontSize: "1.5rem",
                            }}
                        >
                            {option}
                        </Button>
                    )}
                </Stack>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    maxHeight: '100%',
                }}>
                    <Accordion
                        expanded={closeBehavior}
                        onChange={() => setCloseBehavior(!closeBehavior)}
                    >
                        <AccordionSummary id={"behavior"}>
                            <Typography variant='h3'>behavior</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={closeInput}
                        onChange={() => setCloseInput(!closeInput)}
                    >
                        <AccordionSummary id={"input"}>
                            <Typography variant='h3'>input</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={closeCaret}
                        onChange={() => setCloseCaret(!closeCaret)}
                    >
                        <AccordionSummary id={"caret"}>
                            <Typography variant='h3'>caret</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>

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
                                        sx={{mr: 1, pl: 2, pr: 2}}
                                    >preset</Button>
                                     <Button 
                                        variant='contained'  
                                        onClick={() => handleSetCustomTheme()} 
                                        sx={{mr: 1, pl: 2, pr: 2}}
                                    >custom</Button>
                                </Box>
                            </Box>
                            <Stack 
                                direction="row"
                                flexWrap="wrap"
                                sx={{
                                    mt: 5
                                }}>
                                {presetTheme ? <PresetThemes /> : <ThemePicker />}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={closeApperance}
                        onChange={() => setCloseApperance(!closeApperance)}
                    >
                        <AccordionSummary id={"apperance"}>
                            <Typography variant='h3'>apperance</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </>
    )
}
