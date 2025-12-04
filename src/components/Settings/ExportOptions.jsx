import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material'
import useExportTheme from '../../hooks/useExportTheme'

export default function ExportOptions({ onClose, open }) {
    const { writeAsJSONFile, writeAsCSSFile, createLink } = useExportTheme()

    return (
        <Dialog
            onClose={onClose}
            open={open}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ".MuiPaper-root": {
                    width: '350px',
                }
            }}
        >
            <DialogTitle>export theme</DialogTitle>
            <DialogContent sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                <Button 
                    variant='contained' 
                    sx={{
                        mb: 2,
                        mt: 2,
                        p: 2
                    }}
                    onClick={() => writeAsJSONFile()}
                >
                    export as <span style={{color: '#EEED30'}}>&nbsp;json</span>
                </Button>
                <Button
                    variant='contained'
                    sx={{
                        mb: 2,
                        p: 2
                    }}
                    onClick={() => writeAsCSSFile()}
                >
                    export as <span style={{ color: '#6894f7' }}>&nbsp;css</span>
                </Button>
                <Button variant='contained' sx={{
                    mb: 2,
                    p: 2
                }}
                    onClick={() => createLink()}
                >
                    export as link
                </Button>
            </DialogContent>
        </Dialog>
    )
}
