import { useEffect, useState, createContext, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { themes } from "../static/themes/themes.json"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { convertHex } from "../utils/convertHexToRGB";

const ThemeContext = createContext();

const UserTheme = ({ children }) => {
    const setInitalFont = () => {
        let currentFont = "Fira Code"
        if (typeof window !== 'undefined' && window.localStorage) {
            let storedFont = localStorage.getItem('preferred-font')        
            currentFont = storedFont ? storedFont : 'Fira Code'

            if (storedFont) {
                let apiURL = []
                apiURL.push('https://fonts.googleapis.com/css?family=')
                apiURL.push(storedFont.replace(/ /g, "+"))
                apiURL.push('&display=swap')
                const url = apiURL.join('')
                const fontLink = document.createElement('link')
                fontLink.href = url
                fontLink.rel = "stylesheet"
                document.head.append(fontLink)
            }
        }
        return currentFont
    }

    const setInitialState = () => {
        let currentTheme = "default";
        if (typeof window !== 'undefined' && window.localStorage) {
            let storedTheme = localStorage.getItem('theme')    
            currentTheme = storedTheme ? storedTheme : 'default'
        }
        return currentTheme
    }
    const [webTheme, setWebTheme] = useState(setInitialState)
    const [userCreatedTheme, setUserCreatedTheme] = useState(themes['custom'])
    const [font, setFont] = useState(setInitalFont)

    const theme = useMemo(() => createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: themes[webTheme]?.backgroundPrimary,
                        transition: "0.35s ease",
                    },
                    "::-webkit-scrollbar": {
                        background: 'transparent',
                        width: "5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: themes[webTheme]?.textSecondary,
                        borderRadius: "99px",
                    },
                    "::selection": {
                        background: "#ffb7b7", /* WebKit/Blink Browsers */
                    },
                    "::-moz-selection": {
                        background: "#ffb7b7", /* Gecko Browsers */
                    },
                    "input[type='color']": {
                        border: "none",
                        background: "none",
                        height: "32px",
                        width: "32px",
                    },
                    "input[type='color']::-webkit-color-swatch-wrapper": {
                        padding: 0,
                        border: 'none',
                        borderRadius: "4px",
                        background: "none",
                        height: "32px",
                        width: "32px",
                        cursor: "pointer"
                    },
                    "input[type='color']::-webkit-color-swatch": {
                        border: 'none',
                        borderRadius: "4px",
                        background: "none",
                        height: "32px",
                        width: "32px",
                    },

                    // Word styling
                    ".word": {
                        color: themes[webTheme]?.textSub,
                        fontSize: "1.5rem",
                        fontFamily: font
                    },
                    '.active-word': {
                        color: themes[webTheme]?.textPrimary,
                        fontFamily: font
                    },
                    '.correct-word': {
                        color: themes[webTheme]?.textPrimary,
                        fontFamily: font
                    },
                    '.incorrect-word': {
                        color: themes[webTheme]?.errorColor,
                        textDecoration: "underline",
                        textDecorationColor: themes[webTheme]?.errorColor,
                        textUnderlineOffset: '5px',
                        fontFamily: font
                    },

                    // Character styling
                    '.char': {
                        color: themes[webTheme]?.textSub,
                        fontFamily: font
                    },
                    '.correct-char': {
                        color: themes[webTheme]?.textPrimary,
                        fontFamily: font
                    },
                    '.incorrect-char': {
                        color: themes[webTheme]?.errorColor,
                        textDecoration: "underline",
                        textDecorationColor: themes[webTheme]?.errorColor,
                        textUnderlineOffset: '5px',
                        fontFamily: font,
                    },
                }
            },
            MuiAccordion: {
                defaultProps: {
                    elevation: 0,
                    disableGutters: true,
                },
                styleOverrides: {
                    root: {
                        background: 'none',
                        boxShadow: "none",
                        '&.MuiPaper-rounded': {
                            width: "100%",
                        },
                        '&:before': {
                            height: '0px'
                        },

                        transition: "0.35s ease",
                    }
                }
            },
            MuiAccordionSummary: {
                defaultProps: {
                    expandIcon: <ExpandMoreIcon sx={{
                        fontSize: "2rem",
                        color: convertHex(themes[webTheme]?.textPrimary, 0.35),
                    }} />,
                },
                styleOverrides: {
                    root: {
                        fontSize: "2rem",
                        flexDirection: 'row-reverse',
                        color: convertHex(themes[webTheme]?.textSecondary, 0.45),
                        "&:hover": {
                            color: convertHex(themes[webTheme]?.textPrimary, 1),
                            transition: "0.35s ease",
                        },
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                            transform: 'rotate(-90deg)',
                        },
                    }
                }
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        marginLeft: '3rem',
                        marginRight: "3rem",
                    }
                }
            },
            MuiButton: {
                defaultProps: {
                    disableRipple: true
                },
                styleOverrides: {
                    root: {
                        padding: 0,
                        margin: 0,
                        fontFamily: font,
                        fontWeight: "400",
                        textTransform: "lowercase",
                        color: themes[webTheme]?.textPrimary,
                        transition: "0.35s ease",
                        opacity: "0.55",
                        "&:hover": {
                            opacity: '1',
                            backgroundColor: 'transparent'
                        },
                        '&.MuiButton-contained': {
                            background: themes[webTheme]?.backgroundSecondary,
                            boxShadow: "none",
                            opacity: "0.55",
                            borderRadius: "4px",
                            "&:hover": {
                                opacity: '1',
                                backgroundColor: themes[webTheme]?.backgroundSecondary,
                            },
                        }
                    }
                }
            },
            MuiIconButton: {
                defaultProps: {
                    disableRipple: true
                },
                styleOverrides: {
                    root: {
                        padding: 0,
                        margin: 0,
                        fontSize: "32px",
                        color: themes[webTheme]?.textSecondary,
                        opacity: "0.55",
                        transition: "0.35s ease",
                        "&:hover": {
                            opacity: '1'
                        }
                    }
                }
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecoration: 'none',
                        color: themes[webTheme]?.textPrimary
                    }
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: themes[webTheme]?.textSecondary,
                        width: "2px",
                        borderRadius: "99px",
                        opacity: "0.45"
                    }
                }
            },
            MuiSelect: {
                defaultProps: {
                    inputProps: {
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: themes[webTheme]?.backgroundSecondary,
                                    "&.MuiPaper-root": {
                                        borderRadius: '0px',
                                        background: 'none'
                                    }
                                },
                            },
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                        },
                    }
                },
                styleOverrides: {
                    root: {
                        ".MuiSelect-icon": {
                            color: themes[webTheme]?.textSecondary,
                            opacity: ".45"
                        },
                        ".MuiInputBase-input": {
                            color: themes[webTheme]?.textPrimary,
                        },
                    }
                }
            },
            MuiMenu: {
                styleOverrides: {
                    root: {
                        width: '15%',
                        '.MuiMenu-paper': {
                            background: convertHex(themes[webTheme]?.backgroundPrimary, 0.45),
                        },
                    }
                }
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        display: "flex",
                        justifyContent: 'space-between',
                        height: "100%",
                        fontFamily: font
                    }
                }
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        background: convertHex(themes[webTheme]?.backgroundSecondary, 0.45),
                    }
                }
            },
            MuiDiv: {
                styleOverrides: {
                    root: {
                        backgroundColor: convertHex(themes[webTheme]?.backgroundSecondary, 0.45),
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        "&.MuiPaper-rounded": {
                            borderRadius: '4px',
                            width: "50%",
                        }
                    }
                }
            },
            MuiPanel: {
                styleOverrides: {
                    root: {
                        "::-webkit-scrollbar": {
                            background: 'transparent',
                            width: "5px",
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: themes[webTheme]?.textSecondary,
                            borderRadius: "99px"
                        }
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    root: {
                        ".MuiPaper-root": {
                            backgroundColor: themes[webTheme]?.backgroundPrimary,
                            opacity: "1",
                        }
                    }
                }
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontFamily: font,
                        color: themes[webTheme]?.textPrimary
                    }
                }
            },

            MuiTextField: {
                defaultProps: {
                    autoComplete: "false",
                    variant: "outlined",
                    size: 'small',
                    inputProps: {
                        sx: {
                            color: themes[webTheme]?.textPrimary,
                            fontFamily: font
                        },
                    }
                },
                styleOverrides: {
                    root: {
                        fontFamily: font,
                        background: "transparent",
                        "&.placeholder": {
                            fontFamily: font
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: convertHex(themes[webTheme]?.textPrimary, 0.45),
                            },
                            '&:hover fieldset': {
                                borderColor: themes[webTheme]?.textPrimary,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: themes[webTheme]?.textPrimary,
                            },
                        },
                    }
                }
            },
            MuiInputAdornment: {
                styleOverrides: {
                    root: {
                        color: convertHex(themes[webTheme]?.textPrimary, 0.45)
                    }
                }
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        "::-webkit-scrollbar": {
                            background: 'transparent',
                            width: "5px",
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: themes[webTheme]?.textSecondary,
                            borderRadius: "99px"
                        }
                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        "&:hover": {
                            backgroundColor: themes[webTheme]?.backgroundSecondary
                        }
                    }
                }
            },
            MuiListItemText: {
                styleOverrides: {
                    root: {
                        color: themes[webTheme]?.textPrimary,
                    }
                }
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        color: themes[webTheme]?.textSecondary,
                        ".Mui-selected": {
                            color: themes[webTheme]?.textSecondary,
                            opacity: 1,
                        },
                        ".MuiTabs-indicator": {
                            backgroundColor: themes[webTheme]?.textSecondary,
                        }
                    }
                }
            },
            MuiPagination: {
                styleOverrides: {
                    root: {
                        button: {
                            color: themes[webTheme]?.textPrimary,
                            fontFamily: font,
                            borderColor: convertHex(themes[webTheme]?.textPrimary, 0.45)
                        },
                    }
                }
            },
            MuiGameInfo: {
                styleOverrides: {
                    root:{ 
                        background: convertHex(themes[webTheme]?.backgroundSecondary, 0.45),
                        borderRadius: "4px",
                        width: "100%",
                        marginTop: "1rem",
                        padding: '1rem',
                        transition: "0.35s ease",
                        cursor: 'pointer',
                        '&:hover': {
                            background: convertHex(themes[webTheme]?.backgroundSecondary, 1),
                        }
                    }
                }
            }
        },
        palette: {
            text: {
                disabled: "rgba(0, 0, 0, 0.38)",
                primary: themes[webTheme]?.textPrimary,
                secondary: themes[webTheme]?.textSecondary,
                error: themes[webTheme]?.errorColor,
            },
            background: {
                main: convertHex(themes[webTheme]?.backgroundSecondary, 0.45)
            },
        },
        typography: {
            fontFamily: [
                font,
                'monospace',
                'sans-serif',
            ].join(','),
            h4: {
                color: themes[webTheme]?.textSecondary
            },
            h6: {
                color: themes[webTheme]?.textPrimary
            },
        }
    }))

    const toggleTheme = (themeValue) => {
        setWebTheme(themeValue)
        localStorage.setItem('theme', themeValue)
    }

    const toggleFont = (fontValue) => {
        setFont(fontValue)
        localStorage.setItem('preferred-font', fontValue)
    }

    const setCustomTheme = (
        backgroundColor,
        backgroundAltColor,
        caretColor,
        textColor,
        textAltColor,
        errorColor,
        selectColor
    ) => {
        const customTheme = {
            backgroundColor: backgroundColor.toUpperCase(),
            backgroundAltColor: backgroundAltColor.toUpperCase(),
            caretColor: caretColor.toUpperCase(),
            textColor: textColor.toUpperCase(),
            textAltColor: textAltColor.toUpperCase(),
            errorColor: errorColor.toUpperCase(),
            selectColor: selectColor.toUpperCase()
        }
        // themes.custom = customTheme
        // setUserCreatedTheme(customTheme)
        // console.log(userCreatedTheme)
        localStorage.setItem('custom-theme', JSON.stringify(customTheme))
    }
 
    useEffect(() => {
        if (window.localStorage.getItem('theme') !== null) {
            setWebTheme(window.localStorage.getItem('theme'))
        }
        if (window.localStorage.getItem('theme') === "custom" &&
            window.localStorage.getItem('custom-theme') !== null) {
            const themeValues = JSON.parse(localStorage.getItem('custom-theme'))
        }
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                webTheme,
                font,
                userCreatedTheme,
                toggleTheme,
                toggleFont,
                setCustomTheme,
                setUserCreatedTheme,
            }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, UserTheme };