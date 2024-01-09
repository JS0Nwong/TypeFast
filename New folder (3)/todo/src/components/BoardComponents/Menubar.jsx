import { useContext, useState, useRef} from 'react'
import { Box, Button, IconButton, Typography, Divider, useTheme } from '@mui/material'
import {
    SunIcon,
    MoonIcon,
    CaretLeftIcon,
    CaretRightIcon,
    HomeIcon,
    GearIcon,
    LayoutIcon,
    Share1Icon,
    TableIcon
} from "@radix-ui/react-icons";
import { ThemeContext } from "../../App"
import SettingsPanel from './SettingsPanel';
import ShareBoard from './ShareBoard';

export default function Menubar({ id, data, setToggleListView }) {
    const colorMode = useContext(ThemeContext)
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)
    const [openSetting, setOpenSetting] = useState(false)
    const [switchView, setSwitchView] = useState(false)
    const [openShare, setOpenShare] = useState(false)

    const anchorRef = useRef()

    const handleOpenSettings = () =>  {
        setAnchorEl(anchorRef.current)
        setOpenSetting(!openSetting)
    }

    const handleSwitchView = () => {
        setSwitchView(!switchView)
        setToggleListView()
    }

    return (
        <>
            <Box sx={{
                m: 1,
                border: "1px solid rgb(64 64 64)",
                borderRadius: '4px',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                {/* Project Info */}
                <Box>
                    <Typography
                        variant='h6'
                        fontWeight="600"
                        fontSize="1.7rem"
                        fontFamily="Raleway"
                        sx={{
                            textAlign: 'center',
                            ml: 1,
                            mr: 1,
                        }}>
                        {data.name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        flexDirection: "row"
                    }}
                >
                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}>
                        <CaretLeftIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                    </IconButton>
                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}
                        href="/boards"
                    >
                        <HomeIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                    </IconButton>
                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}>
                        <CaretRightIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                    </IconButton>

                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(229, 229, 229, 0.25)', mt: 1, mb: 1, mr: 0.5, ml: 0.5 }} />

                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}
                        onClick={() => handleSwitchView()}
                    >
                        {switchView ? 
                        <LayoutIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                        : 
                        <TableIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />}
                    </IconButton>

                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}
                        onClick={colorMode.toggleTheme}
                    >
                        {theme.palette.currentTheme == "dark" ?
                            <SunIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} /> :
                            <MoonIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                        }
                    </IconButton>

                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}
                        onClick={() => setOpenShare(!openShare)}
                    >
                        <Share1Icon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                    </IconButton>
                    <IconButton sx={{
                        borderRadius: "5px",
                        m: 1,
                        border: '1px solid  rgba(82, 82, 82, 1)'
                    }}
                        onClick={() => handleOpenSettings()}
                        ref={anchorRef}
                    >
                        <GearIcon style={{ width: "20px", height: "20px", color: 'rgba(163, 163, 163, 1)' }} />
                    </IconButton>
                </Box>
            </Box>
            {openSetting && <SettingsPanel 
                open={openSetting}
                onClose={() => setOpenSetting(!openSetting)}
                anchor={anchorEl}
            />}
            {openShare && <ShareBoard
                id={id}
                data={data}
                open={openShare}
                onClose={() => setOpenShare(!openShare)}
            />}
        </>
    )
}
