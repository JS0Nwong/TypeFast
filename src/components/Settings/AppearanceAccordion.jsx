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
import { useClientSettings } from '../../hooks/useClientSettings'
import { ThemeContext } from '../../hooks/useTheme';

export default function AppearanceAccordion() { 
    const { viewValue, toggleViewSettings } = useContext(ThemeContext)
    const {
        closeApperance,
        setCloseApperance,
    } = useClientSettings()
    const viewOptions = [
        {
            type: 'normal',
            value: '30%'
        },
        {
            type: 'compact',
            value: '50%'
        },
        {
            type: 'exploded',
            value: '15%'
        },
    ]
    const handleViewSettings = (option) => {
        toggleViewSettings(option)
    }


    return (
        <Accordion
            expanded={closeApperance}
            onChange={() => setCloseApperance(!closeApperance)}
        >
            <AccordionSummary id={"apperance"}>
                <Typography variant='h3'>apperance</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Typography>view</Typography>
                </Box>
                <Stack
                    direction="row"
                    justifyContent='space-between'
                    sx={{
                        mt: 5
                    }}>
                    {viewOptions.map((option) =>
                        <Button
                            key={option.type}
                            variant='contained'
                            sx={{
                                width: "100%",
                                p: 1,
                                m: 1,
                                opacity: option.value === viewValue ? 1 : 0.45,
                            }}
                            onClick={() => handleViewSettings(option.value)}
                        >
                            {option.type}
                        </Button>)}
                </Stack>
            </AccordionDetails>
        </Accordion>)
}