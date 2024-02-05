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
    const viewOptions = ['normal', 'compact', 'exploded']
    const handleViewSettings = (option) => {
        if (option === 'compact') {
            toggleViewSettings('50%')
        }
        if (option === 'exploded') {
            toggleViewSettings('15%')
        }
        if (option === 'normal') {
            toggleViewSettings('30%')
        }
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
                            key={option}
                            variant='contained'
                            sx={{
                                width: "100%",
                                p: 1,
                                m: 1,
                            }}
                            onClick={() => handleViewSettings(option)}
                        >
                            {option}
                        </Button>)}
                </Stack>
            </AccordionDetails>
        </Accordion>)
}