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

export default function CaretAccordion() {
    const {
        closeCaret,
        setCloseCaret,
    } = useClientSettings()
    const caretOptions = [
        {
            type: 'off',
            value: '0'
        },
        {
            type: 'slow',
            value: '50%'
        },
        {
            type: 'medium',
            value: '15%'
        },
        {
            type: 'fast',
            value: '15%'
        },
    ]
    const caretType = [
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
            type: 'none',
        },
        {
            type: 'filled',
        },
    ]


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
                        {caretOptions.map((option) =>
                            <Button
                                key={option.type}
                                variant='contained'
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    m: 1,
                                    // opacity: option.value === viewValue ? 1 : 0.45,
                                }}
                            // onClick={() => handleViewSettings(option.value)}
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
                                // opacity: option.value === viewValue ? 1 : 0.45,
                            }}
                            // onClick={() => handleViewSettings(option.value)}
                        >
                            {option.type}
                        </Button>)}
                </Stack>
            </AccordionDetails>
        </Accordion>

    )
}