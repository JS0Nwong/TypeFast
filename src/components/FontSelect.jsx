import { useState, useContext } from 'react'
import { Box, Button } from "@mui/material"
import { useModal } from "../hooks/useModal"
import FontModal from "./FontModal"
import { ThemeContext } from '../hooks/useTheme'

export default function FontSelect() {
    const {font} = useContext(ThemeContext)
 
    const [fontName, setFontName] = useState(font)
    const { openModal, handleOpenModal, handleCloseModal } = useModal()
    return (
        <>
            <Box sx={{
                width: "98px",
            }}>
                <Button
                    variant='contained'
                    sx={{
                        ml: 1,
                        height: "100%",
                        width: '100%',
                        p: 0.25,
                        textOverflow: "ellipsis"
                    }}
                    onClick={handleOpenModal}
                >
                    {fontName}
                </Button>
            </Box>
            {openModal && <FontModal open={openModal} onClose={handleCloseModal}/>}
        </>
    )
}
