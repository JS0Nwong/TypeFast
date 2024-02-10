import { useContext } from 'react'
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material"
import { useClientSettings } from '../../hooks/useClientSettings'

export default function InputAccordion() {
    const {
        closeInput,
        setCloseInput,
    } = useClientSettings()
    return (
        <Accordion
            expanded={closeInput}
            onChange={() => setCloseInput(!closeInput)}
        >
            <AccordionSummary id={"input"}>
                <Typography variant='h3'>input</Typography>
            </AccordionSummary>
            <AccordionDetails>
                asdsad
            </AccordionDetails>
        </Accordion>
    )
}
