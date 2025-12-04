import { useState, useContext, useEffect } from 'react'
import { Box, TextField, Typography, Button, Divider } from '@mui/material'
import PaletteIcon from '@mui/icons-material/Palette';

import { ThemeContext } from '../../hooks/useTheme'

import useThemeStore from '../../utils/stores/themeStore'
import { useBoundStore } from '../../utils/stores/boundStore';
import { useThemeStoreActions } from '../../utils/stores/themeStore'
import FeedbackSnackbar from '../FeedbackSnackbar';
import ExportOptions from './ExportOptions';
import useImportTheme from '../../hooks/useImportTheme';


export default function ThemePicker() {
    const { viewValue, handleSetCustomTheme, handleResetTheme } = useContext(ThemeContext)
    const [errorAltColor, setErrorAltColor] = useState()
    const [open, setOpen] = useState(false)

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
        setTheme,
        resetTheme

    } = useThemeStoreActions((state) => ({
        setBackgroundColor: state.setBackgroundColor,
        setBackgroundAltColor: state.setBackgroundAltColor,
        setCaretColor: state.setCaretColor,
        setTextColor: state.setTextColor,
        setTextAltColor: state.setTextAltColor,
        setErrorColor: state.setErrorColor,
        setSelectColor: state.setSelectColor,
        getColors: state.getColors,
        setTheme: state.setTheme,
        resetTheme: state.resetTheme,
    }))

    const { setSnackbar } = useBoundStore((state) => ({setSnackbar: state.setSnackbar}))
    
    const handleBackgroundChange = (color) => {
        setBackgroundColor(color)
        setTheme()
    }
    const handleBackgroundAltChange = (color) => {
        setBackgroundAltColor(color)
        setTheme()
    }
    const handleCaretColorChange = (color) => {
        setCaretColor(color)
        setTheme()
    }
    const handleTextColorChange = (color) => {
        setTextColor(color)
        setTheme()
    }
    const handleTextAltColorChange = (color) => {
        setTextAltColor(color)
        setTheme()
    }
    const handleErrorColorChange = (color) => {
        setErrorColor(color)
        setTheme()
    }
    const handleSelectColorChange = (color) => {
        setSelectColor(color)
        setTheme()
    }

    const setCustom = () => {
        setTheme()
        handleSetCustomTheme()
        setSnackbar('Saved custom theme!')
    }

    const reset =() => {
        resetTheme()
        handleResetTheme()
    }

    const openExport = (bool) => {
        setOpen(bool)
    }

    const handleImport = (e) => {
        useImportTheme(e)
    }

    useEffect(() => {
        getColors()
    }, [])

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: '100%',
            }}>
                <FeedbackSnackbar />
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
                                <label htmlFor='bg-primary'>
                                    <PaletteIcon sx={{ 
                                        position: 'absolute', 
                                        color: textPrimary,
                                        m: '4px',
                                        cursor: "pointer" 
                                    }} />
                                </label>
                                <input
                                    value={backgroundSecondary}
                                    type="color"
                                    id="bg-primary"
                                    style={{
                                        marginRight: '8px',
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
                        <Box sx={{
                            display: 'flex',
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
                                <label htmlFor='bg-secondary'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: textPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>                                
                                <input
                                    value={backgroundSecondary}
                                    type="color"
                                    name=""
                                    id="bg-secondary"
                                    style={{
                                        marginRight: '8px',
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
                        <Box sx={{
                            display: 'flex',
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
                                <label htmlFor='text-caret'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>                                        
                                <input
                                    value={textCaret}
                                    type="color"
                                    name=""
                                    id="text-caret"
                                    style={{
                                        marginRight: '8px',
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
                            <Typography variant='h5' sx={{ ml: viewValue === "50%" ? 0 : 4 }}>text</Typography>
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
                                <label htmlFor='text-primary'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>                                     
                                <input
                                    value={textPrimary}
                                    type="color"
                                    name=""
                                    id="text-primary"
                                    style={{
                                        marginRight: '8px',
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
                            <Typography variant='h5' sx={{ ml: viewValue === "50%" ? 0 : 4 }}>text alt</Typography>
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
                                <label htmlFor='text-alt'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>
                                <input
                                    value={textSecondary}
                                    type="color"
                                    name=""
                                    id="text-alt"
                                    style={{
                                        marginRight: '8px',
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
                            <Typography variant='h5' sx={{ ml: viewValue === "50%" ? 0 : 4 }}>select</Typography>
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
                                <label htmlFor='select'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>                               
                                 <input
                                    value={select}
                                    type="color"
                                    name=""
                                    id="select"
                                    style={{
                                        marginRight: '8px',
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
                                 <label htmlFor='error'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>       
                                <input
                                    value={errorColor}
                                    type="color"
                                    name=""
                                    id="error"
                                    style={{
                                        marginRight: '8px',
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
                                <label htmlFor='error-alt'>
                                    <PaletteIcon sx={{
                                        position: 'absolute',
                                        color: backgroundPrimary,
                                        m: '4px',
                                        cursor: "pointer"
                                    }} />
                                </label>                                       
                                <input
                                    value={errorColor}
                                    type="color"
                                    name=""
                                    id="error-alt"
                                    style={{
                                        marginRight: '8px',
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
                    <Button onClick={() => openExport(true)}>
                        export
                    </Button>
                    <Button>
                        <label
                            htmlFor='theme_file'
                            style={{
                                cursor: 'pointer',
                            }}>
                            import
                        </label>
                        <input
                            type="file"
                            id="theme_file"
                            name="theme_file"
                            accept=".css, .json"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImport(e)}
                        />
                    </Button>
                   
                    <Button onClick={() => reset()}>
                        reset
                    </Button>
                    <Button sx={{ mr: -0.5, ml: 4 }} onClick={() => setCustom()}>
                        save
                    </Button>
                </Box>
                <ExportOptions onClose={() => openExport(false)} open={open}/>
            </Box>
        </>
    )
}
