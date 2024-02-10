import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material"
import { useClientSettings } from '../../hooks/useClientSettings'

export default function BehaviorAccordion() {
    const {
        closeBehavior,
        setCloseBehavior,
    } = useClientSettings()
    return (
        <Accordion
            expanded={closeBehavior}
            onChange={() => setCloseBehavior(!closeBehavior)}
        >
            <AccordionSummary id={"behavior"}>
                <Typography variant='h3'>behavior</Typography>
            </AccordionSummary>
            <AccordionDetails>
                asdsad
            </AccordionDetails>
        </Accordion>
    )
}
