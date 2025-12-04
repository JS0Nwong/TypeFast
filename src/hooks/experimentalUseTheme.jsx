import { useState, createContext, useMemo, useCallback, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import {
    experimental_extendTheme as extendTheme,
    Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles'
import { themes } from "../static/themes/themes.json"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { convertHex } from "../utils/convertHexToRGB";
import { pSBC } from "../utils/adjustColor"
import useThemeStore from "../utils/stores/themeStore";

const ThemeContext = createContext()

const ExperimentalUseTheme = ({ children }) => {
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
        if(typeof window !== 'undefined' && window.localStorage) {
            let storedUserTheme = localStorage.getItem('custom-theme')
            themes.custom = storedUserTheme ? JSON.parse(storedUserTheme) : themes.custom
        }
        return currentTheme
    }
    const setIntitalView = () => {
        let defaultView = "25%"
        if (typeof window !== 'undefined' && window.localStorage) {
            let storedView = localStorage.getItem('preferred-view')
            defaultView = storedView ? storedView : '25%'
        }
        return defaultView
    }

    const setInitialCaret = () => {
        let defaultCaretSpeed = 0.1
        if (typeof window !== 'undefined' && window.localStorage) {
            let storedCaretSpeed = localStorage.getItem('caret-speed')
            defaultCaretSpeed = storedCaretSpeed ? storedCaretSpeed : 0.1
        }
        return Number(defaultCaretSpeed)
    }

    const setInitialCaretType = () => {
        let defaultCaret = 'line'
        if (typeof window !== 'undefined' && window.localStorage) {
            let storedCaretType= localStorage.getItem('caret-type')
            defaultCaret = storedCaretType ? storedCaretType : 'line'
        }
        return defaultCaret
    }

    const [webTheme, setWebTheme] = useState(setInitialState)
    const [font, setFont] = useState(setInitalFont)
    const [viewValue, setViewValue] = useState(setIntitalView)
    const [caretSpeedValue, setCaretSpeedValue] = useState(setInitialCaret)
    const [caretType, setCaretType] = useState(setInitialCaretType)

    const theme = extendTheme({
        colorSchemes: {
            default: {
                palette: {
                    primary: {
                        light: '#757ce8',
                        main: '#3f50b5',
                        dark: '#002884',
                        contrastText: '#fff',
                    }
                }
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: themes[webTheme]?.backgroundPrimary,
                        transition: "0.45s ease",
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
                        background: themes[webTheme]?.select, /* WebKit/Blink Browsers */
                    },
                    "::-moz-selection": {
                        background: themes[webTheme]?.select, /* Gecko Browsers */
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
                        color: pSBC(-0.60, themes[webTheme]?.textPrimary, false, true),
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
                    },

                    // Character styling
                    '.char': {
                        color: pSBC(-0.60, themes[webTheme]?.textPrimary, false, true),
                        fontFamily: font
                    },
                    '.correct-char': {
                        color: themes[webTheme]?.textPrimary,
                        fontFamily: font
                    },
                    '.incorrect-char': {
                        color: themes[webTheme]?.errorColor,
                        fontFamily: font,
                    }
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
                        opacity: 0.55,
                        "&:hover": {
                            opacity: '1',
                            backgroundColor: 'transparent'
                        },
                        '&.MuiButton-contained': {
                            background: themes[webTheme]?.backgroundSecondary,
                            boxShadow: "none",
                            borderRadius: "4px",
                            "&:hover": {
                                opacity: '1',
                                backgroundColor: convertHex(themes[webTheme]?.textPrimary),
                            },
                        },
                        '&.MuiButton-outlined': {
                            border: `2px solid ${themes[webTheme]?.backgroundSecondary}`,
                            "&:hover": {
                                backgroundColor: themes[webTheme]?.backgroundSecondary,
                            },
                        }
                    }
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        opacity: 0.55,
                        '&.Mui-checked': {
                            opacity: 1,
                            color: themes[webTheme]?.textSecondary
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
                        borderRadius: 0,
                        fontSize: "32px",
                        color: themes[webTheme]?.textSecondary,
                        transition: '0.25s ease',
                        "&:hover": {
                            color: themes[webTheme]?.textPrimary,
                        },
                        "&:focus-visible": {
                            outline: `2px solid ${themes[webTheme]?.textSecondary}`,
                            outlineOffset: '10px',
                            borderRadius: '1px'
                        },
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
            MuiFormControlLabel: {
                styleOverrides: {
                    root: {
                        ".MuiFormControlLabel-label": {
                            opacity: 0.55
                        }
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
            MuiPodium: {
                styleOverrides: {
                    root: {
                        background: themes[webTheme]?.backgroundSecondary,
                        width: '100%',
                        padding: '2rem',
                        borderRadius: '6px',
                        textAlign: 'center',
                        borderTop: `4px solid ${themes[webTheme]?.textSecondary}`,
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
                            fontFamily: font,
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
                        "& .MuiTabs-indicator": {
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
                    root: {
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
            },
            MuiGutter: {
                styleOverrides: {
                    root: {
                        width: viewValue,
                        transition: "0.15s ease",
                    }
                }
            },
            MuiCaretLine: {
                styleOverrides: {
                    root: {
                        width: "2px",
                        borderRadius: "99px",
                        height: '24px',
                        background: themes[webTheme].textSecondary,
                        position: 'absolute',
                        transition: "0.15s ease-in-out",
                    }
                }
            },
            MuiCaretUnderline: {
                styleOverrides: {
                    root: {
                        width: "2px",
                        borderRadius: "99px",
                        height: '2px',
                        background: themes[webTheme].textSecondary,
                        position: 'absolute',
                        transition: "0.15s ease-in-out",
                    }
                }
            },
            MuiTooltip: {
                defaultProps: {
                    arrow: true,
                },
                styleOverrides: {
                    tooltip: {
                        fontSize: "1em",
                        backgroundColor: "#0a0908",
                    },
                    arrow: {
                        color: '#0a0908',
                    },
                }
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        '&.Mui-checked': {
                            color: themes[webTheme]?.textPrimary,
                        }
                    }
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        '&.MuiChip-sizeSmall': {
                            paddingLeft: '.5rem',
                            paddingRight: ".5rem",

                        }
                    }
                }
            }
        },
        // palette: {
        //     text: {
        //         disabled: "rgba(0, 0, 0, 0.38)",
        //         primary: themes[webTheme]?.textPrimary,
        //         secondary: themes[webTheme]?.textSecondary,
        //         error: themes[webTheme]?.errorColor,
        //     },
        //     background: {
        //         main: themes[webTheme]?.backgroundPrimary
        //     },
        // },
        typography: {
            fontFamily: [
                font,
                'monospace',
                'sans-serif',
            ].join(','),
            subtitle1: {
                color: themes[webTheme]?.textSecondary
            },
            h4: {
                color: themes[webTheme]?.textSecondary
            },
            h6: {
                color: themes[webTheme]?.textPrimary
            },
        }
    })
    
    return (
        <CssVarsProvider theme={theme}>
            {children}
        </CssVarsProvider>
    )
}

export { ThemeContext, ExperimentalUseTheme };