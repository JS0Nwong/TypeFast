import { useContext } from 'react'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    styled,
    Stack,
    Button
} from "@mui/material"
import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from '../../hooks/useTheme';
import AppearanceAccordion from './AppearanceAccordion';
import ThemeAccordion from './ThemeAccordion';

export default function Settings() {
    const { toggleTheme } = useContext(ThemeContext)
    const {
        closeInput,
        closeBehavior,
        closeCaret,
        setCloseInput,
        setCloseBehavior,
        setCloseCaret,
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

                    <ThemeAccordion />
                    <AppearanceAccordion />
                </Box>
            </Box>
        </>
    )
}
