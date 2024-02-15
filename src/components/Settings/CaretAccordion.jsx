import { useContext, useEffect } from "react"
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Box,
    Stack, 
    Button,
} from "@mui/material"
import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from "../../hooks/useTheme"

export default function CaretAccordion() {
    const { 
        caretType, 
        caretSpeedValue, 
        toggleCaretSpeed, 
        toggleCaretType 
    } = useContext(ThemeContext)

    const {
        closeCaret,
        setCloseCaret,
    } = useClientSettings()
    const caretOptions = [
        {
            type: 'off',
            value: 0
        },
        {
            type: 'slow',
            value: 0.15
        },
        {
            type: 'medium',
            value: 0.1
        },
        {
            type: 'fast',
            value: 0.07
        },
    ]
    const caretTypes = [
        {
            type: 'none',
        },
        {
            type: 'line',
        },
        {
            type: 'underline',
        },
        {
            type: 'box',
        },
        {
            type: 'filled',
        },
    ]

    const handleCaretSpeed = (speed) => {
        toggleCaretSpeed(speed)
    }
    const handleCaretTypeChange = (type) => {
        toggleCaretType(type)
    }

    return (
        <Accordion
            expanded={closeCaret}
            onChange={() => setCloseCaret(!closeCaret)}
        >
            <AccordionSummary id={"caret"}>
                <Typography variant='h3'>caret</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Typography>caret type</Typography>
                </Box>
                <Stack
                        direction="row"
                        justifyContent='space-between'
                        sx={{
                            mt: 5
                        }}>
                        {caretTypes.map((option) =>
                            <Button
                                key={option.type}
                                variant='contained'
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    m: 1,
                                    opacity: option.type === caretType ? 1 : 0.45,
                                }}
                            onClick={() => handleCaretTypeChange(option.type)}
                            >
                                {option.type}
                            </Button>)}
                    </Stack>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 3,
                }}>
                    <Typography>smooth caret</Typography>
                </Box>
                <Stack
                    direction="row"
                    justifyContent='space-between'
                    sx={{
                        mt: 5
                    }}>
                    {caretOptions.map((option) =>
                        <Button
                            key={option.type}
                            variant='contained'
                            sx={{
                                width: "100%",
                                p: 1,
                                m: 1,
                                opacity: option.value === caretSpeedValue ? 1 : 0.45,
                            }}
                            onClick={() => handleCaretSpeed(option.value)}
                        >
                            {option.type}
                        </Button>)}
                </Stack>
            </AccordionDetails>
        </Accordion>

    )
}