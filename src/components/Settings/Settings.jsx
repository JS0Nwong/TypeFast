import {
    styled,
    Stack,
    Button
} from "@mui/material"
import AppearanceAccordion from './AppearanceAccordion';
import ThemeAccordion from './ThemeAccordion';
import CaretAccordion from "./CaretAccordion"
import InputAccordion from './InputAccordion';
import BehaviorAccordion from "./BehaviorAccordion";

export default function Settings() {
    const options = ['behavior', 'input', 'caret', 'theme', 'apperance']
    const Box = styled("div", {
        name: "MuiPanel",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;

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
                    <BehaviorAccordion />
                    <InputAccordion />
                    <CaretAccordion />
                    <ThemeAccordion />
                    <AppearanceAccordion />
                </Box>
            </Box>
        </>
    )
}
