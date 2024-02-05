import { useState, useContext } from 'react'
import { Box, TextField, Typography, Button, Divider } from '@mui/material'
import { themes } from "../../static/themes/themes.json"
import { ThemeContext } from '../../hooks/useTheme'
import PaletteIcon from '@mui/icons-material/Palette';

export default function ThemePicker() {
    const { setCustomTheme, setUserCreatedTheme, viewValue } = useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState(themes['custom']?.backgroundPrimary)
    const [backgroundAltColor, setBackgroundAltColor] = useState(themes['custom']?.backgroundSecondary)
    const [caretColor, setCaretColor] = useState(themes['custom']?.textCaret)
    const [textColor, setTextColor] = useState(themes['custom']?.textPrimary)
    const [textAltColor, setTextAltColor] = useState(themes['custom']?.textSecondary)
    const [errorColor, setErrorColor] = useState(themes['custom']?.errorColor)
    const [selectColor, setSelectColor] = useState(themes['custom']?.select)
    const [errorAltColor, setErrorAltColor] = useState()

    const handleBackgroundChange = (color) => {
        setBackgroundColor(color)
        setCustomTheme(
            color,
            backgroundAltColor,
            caretColor,
            textColor,
            textAltColor,
            errorColor,
            selectColor
        )
    }
    const handleBackgroundAltChange = (color) => {
        console.log(color.toUpperCase())
        themes.custom.backgroundSecondary = color.toUpperCase()
        // setBackgroundAltColor(color)
        // setCustomTheme(
        //     backgroundColor,
        //     color,
        //     caretColor,
        //     textColor,
        //     textAltColor,
        //     errorColor,
        //     selectColor
        // )
    }
    const handleCaretChange = (color) => {

    }
    const handleTextChange = (color) => {

    }
    const handleTextAltChange = (color) => {

    }
    const handleErrorChange = (color) => {

    }
    const handleSelectColorChange = (color) => {

    }


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: viewValue === "50%" ? 'column' : "row",
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}>
                        {/* Background color picker */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography variant='h5'>background</Typography>
                            <Box>
                                <TextField
                                    value={backgroundColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} 
                                    onChange={(e) => handleBackgroundChange(e.target.value)}
                                    />
                                <input 
                                    value={backgroundColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px', 
                                        border: 'none', 
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => handleBackgroundChange(e.target.value)}
                                />
                            </Box>
                        </Box>

                        {/* Background Alt Color Picker */}
                        <Box sx={{  display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2
                        }}>
                            <Typography variant='h5'>background alt</Typography>
                            <Box>
                                <TextField
                                    value={backgroundAltColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input 
                                    value={backgroundAltColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px', 
                                        border: 'none', 
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => handleBackgroundAltChange(e.target.value)}
                                />
                            </Box>
                        </Box>

                        {/* Caret Color Picker */}
                        <Box sx={{  display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2
                        }}>
                            <Typography variant='h5'>caret</Typography>
                            <Box>
                                <TextField
                                    value={caretColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} 
                                    onChange={(e) => setCaretColor(e.target.value)}
                                    />
                                <input 
                                    value={caretColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px',
                                        border: 'none',
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => setCaretColor(e.target.value)}
                                />
                            </Box>
                        </Box>

                    </Box>

                    {/* Text, text alt and select color picker */}

                    <Box sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        width: "100%",
                        mt: viewValue === "50%" ? 2 : 0,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography variant='h5' sx={{ml: viewValue === "50%" ? 0 : 4}}>text</Typography>
                            <Box>
                                <TextField
                                    value={textColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input 
                                    value={textColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px', 
                                        border: 'none', 
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => setTextColor(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2

                        }}>
                            <Typography variant='h5' sx={{ml: viewValue === "50%" ? 0 : 4}}>text alt</Typography>
                            <Box>
                                <TextField
                                    value={textAltColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input 
                                    value={textAltColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px', 
                                        border: 'none', 
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => setTextAltColor(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2
                        }}>
                            <Typography variant='h5' sx={{ml: viewValue === "50%" ? 0 : 4}}>select</Typography>
                            <Box>
                                <TextField
                                    value={selectColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input 
                                    value={selectColor}
                                    type="color" 
                                    name="" 
                                    id=""
                                    style={{
                                        marginRight: '48px', 
                                        border: 'none', 
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }} 
                                    onChange={(e) => setSelectColor(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ width: "100%", mt: 3, height: '2px' }} />

                {/* Error Colors */}
                <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: viewValue === "50%" ? 'column' : "row", width: "100%", }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Typography variant='h5'>error</Typography>
                            <Box>
                                <TextField
                                    value={errorColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input
                                    value={errorColor}
                                    type="color"
                                    name=""
                                    id=""
                                    style={{
                                        marginRight: '48px',
                                        border: 'none',
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }}
                                    onChange={(e) => setErrorColor(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: viewValue === "50%" ? 2 : 0
                        }}>
                            <Typography variant='h5' sx={{ml: viewValue === "50%" ? 0 : 4}}>error alt</Typography>
                            <Box>
                                <TextField
                                    value={errorColor}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} />
                                <input
                                    value={errorColor}
                                    type="color"
                                    name=""
                                    id=""
                                    style={{
                                        marginRight: '48px',
                                        border: 'none',
                                        outline: 'none',
                                        width: '32px',
                                        height: '32px',
                                    }}
                                    onChange={(e) => setErrorAltColor(e.target.value)}
                                />
                            </Box>
                        </Box>  
                    </Box>
                </Box>

                <Box sx={{
                    mt: 3, 
                    width: "100%", 
                    display: "flex", 
                    justifyContent: 'flex-end',
                }}>
                    <Button>
                        load
                    </Button>
                    <Button sx={{mr: 4}}>
                        save
                    </Button>
                </Box>
                
            </Box>
        </>
    )
}
