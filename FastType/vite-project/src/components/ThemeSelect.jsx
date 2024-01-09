import { useContext } from 'react'
import { Box, Button } from "@mui/material"
import { ThemeContext } from '../hooks/useTheme';
import { useModal } from '../hooks/useModal';

import ThemeModal from './ThemeModal';

import { themes } from "../static/themes/themes.json"

export default function ThemeSelect() {

    const { toggleTheme, webTheme } = useContext(ThemeContext)
    const { openModal, handleCloseModal, handleOpenModal } = useModal()

    return (
        <Box sx={{
            width: "98px",
        }}>
            <Button
                variant='contained'
                sx={{
                    ml: 1,
                    height: "100%",
                    width: '100%',
                    p: 0.25
                }}
                onClick={handleOpenModal}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    width: "100%",
                }}>
                    <Box sx={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "99px",
                        mr: 0.5,
                        m1: 0.5,
                        background: themes[webTheme].backgroundPrimary
                    }}>

                    </Box>
                    <Box sx={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "99px",
                        mr: 0.5,
                        m1: 0.5,
                        background: themes[webTheme].textPrimary,
                    }}>

                    </Box>
                    <Box sx={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "99px",
                        background: themes[webTheme].textSecondary,
                        mr: 0.5
                    }}>
                    </Box>
                </Box>

            </Button>
            {openModal && <ThemeModal open={openModal} onClose={handleCloseModal}/>}
        </Box>
    )
}
