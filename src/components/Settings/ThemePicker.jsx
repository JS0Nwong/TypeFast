import { useState, useContext, useEffect } from 'react'
import { Box, TextField, Typography, Button, Divider } from '@mui/material'
import { ThemeContext } from '../../hooks/useTheme'
import useThemeStore from '../../utils/stores/themeStore'
import { useThemeStoreActions } from '../../utils/stores/themeStore'
import PaletteIcon from '@mui/icons-material/Palette';

export default function ThemePicker() {
    const { viewValue, setCustomTheme, userCreatedTheme } = useContext(ThemeContext)
    const [errorAltColor, setErrorAltColor] = useState()

    const {
        customTheme,
        backgroundPrimary,
        backgroundSecondary,
        textCaret,
        textPrimary,
        textSecondary,
        errorColor,
        select,
    } = useThemeStore((state) => ({
        customTheme: state.customTheme,
        backgroundPrimary: state.backgroundPrimary,
        backgroundSecondary: state.backgroundSecondary,
        textCaret: state.textCaret,
        textPrimary: state.textPrimary,
        textSecondary: state.textSecondary,
        errorColor: state.errorColor,
        select: state.select,
    }))

    const {
        setBackgroundColor,
        setBackgroundAltColor,
        setCaretColor,
        setTextColor,
        setTextAltColor,
        setErrorColor,
        setSelectColor,
        getColors,
    } = useThemeStoreActions()

    const handleBackgroundChange = (color) => {
        setBackgroundColor(color)
        setCustomTheme()
    }
    const handleBackgroundAltChange = (color) => {
        setBackgroundAltColor(color)
        setCustomTheme()
    }
    const handleCaretColorChange = (color) => {
        setCaretColor(color)
        setCustomTheme()
    }
    const handleTextColorChange = (color) => {
        setTextColor(color)
        setCustomTheme()
    }
    const handleTextAltColorChange = (color) => {
        setTextAltColor(color)
        setCustomTheme()
    }
    const handleErrorColorChange = (color) => {
        setErrorColor(color)
        setCustomTheme()
    }
    const handleSelectColorChange = (color) => {
        setSelectColor(color)
        setCustomTheme()
    }

    useEffect(() => {
        getColors()
        // console.log(customTheme)
        // console.log(getColors())
        console.log(userCreatedTheme)
        // useThemeStore.subscribe((state, prevState) => )
    }, [])

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
                                    value={backgroundPrimary}
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
                                    value={backgroundPrimary}
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
                                    value={backgroundSecondary}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} 
                                    onChange={(e) => handleBackgroundAltChange(e.target.value)}
                                    />
                                <input 
                                    value={backgroundSecondary}
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
                                    value={textCaret}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }} 
                                    onChange={(e) => handleCaretColorChange(e.target.value)}
                                    />
                                <input 
                                    value={textCaret}
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
                                    onChange={(e) => handleCaretColorChange(e.target.value)}
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
                                    value={textPrimary}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }}
                                    onChange={(e) => handleTextColorChange(e.target.value)}
                                />
                                <input 
                                    value={textPrimary}
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
                                    onChange={(e) => handleTextColorChange(e.target.value)}
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
                                    value={textSecondary}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }}
                                    onChange={(e) => handleTextAltColorChange(e.target.value)}
                                />
                                <input 
                                    value={textSecondary}
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
                                    onChange={(e) => handleTextAltColorChange(e.target.value)}
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
                                    value={select}
                                    inputProps={{ style: { height: "16px" } }}
                                    sx={{
                                        mr: 1,
                                        p: 0,
                                        "&.MuiInputBase": {
                                            height: '10px',
                                        },
                                    }}
                                    onChange={(e) => handleSelectColorChange(e.target.value)}
                                />
                                <input 
                                    value={select}
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
                                    onChange={(e) => handleSelectColorChange(e.target.value)}
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
                                    }}
                                    onChange={(e) => handleErrorColorChange(e.target.value)}
                                />
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
                                    onChange={(e) => handleErrorColorChange(e.target.value)}
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
                            <Typography
                                variant='h5'
                                sx={{
                                    ml: viewValue === "50%" ? 0 : 4
                                }}>
                                error alt
                            </Typography>
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
                                    }}
                                    onChange={(e) => setErrorAltColor(e.target.value)}
                                />
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
                        export
                    </Button>
                    <Button>
                        import
                    </Button>
                    <Button sx={{mr: 4}} onClick={() => setCustomTheme()}>
                        save
                    </Button>
                </Box>
                
            </Box>
        </>
    )
}
