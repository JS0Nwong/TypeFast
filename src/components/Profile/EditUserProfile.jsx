import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    TextField,
    DialogContent,
    InputAdornment,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function EditUserProfile({ open, onClose }) {
    const [bioCharLimit, setBioCharLimit] = useState(0)
    const [keyboardCharLimit, setKeyboardCharLimit] = useState(0)

    const [instagramLink, setInstagramLink] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [xLink, setXLink] = useState('')
    
    const [bioInfo, setBioInfo] = useState('')
    const [keyboardInfo, setKeyboardInfo] = useState('')

    const { editUserProfile } = useAuth()

    const handleSetBio = (info) => {
        setBioCharLimit(info.length)
        setBioInfo(info)
    }

    const handleSetKeyboard = (info) => {
        setKeyboardCharLimit(info.length)
        setKeyboardInfo(info)   
    }
    
    const handleSetYoutube = (info) => {
        setYoutubeLink(info)
    }
    const handleSetInstagram = (info) => {
        setInstagramLink(info)
    }
    const handleSetX = (info) => {
        setXLink(info)
    }
    
    const handleSaveProfile = () => {
        editUserProfile(
            bioInfo, 
            keyboardInfo,
            instagramLink,
            youtubeLink,
            xLink,
        )
        onClose()
    }

    return (
        <>
            <Dialog
                onClose={onClose}
                open={open}
                sx={{
                    height: '100%',
                }}
            >
                <DialogTitle>edit profile</DialogTitle>
                <DialogContent sx={{
                    height: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 1,
                }}>
                    <DialogContentText sx={{ mt: 1 }}>personal details</DialogContentText>
                    <TextField
                        inputProps={{
                            maxLength: 300,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Typography sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        fontSize: "12px",
                                        p: 1,
                                    }}>
                                        {bioCharLimit} / 300
                                    </Typography>
                                </InputAdornment>
                            )
                        }}
                        autoComplete='off'
                        fullWidth
                        placeholder='bio info'
                        multiline
                        rows={5}
                        sx={{
                            mt: 1,
                            overflow: "visible",
                            width: "100%",
                        }}
                        onChange={(e) => handleSetBio(e.target.value)}
                    />
                    <TextField
                        inputProps={{
                            maxLength: 150,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Typography sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        fontSize: "12px",
                                        p: 1,
                                    }}>
                                        {keyboardCharLimit} / 150
                                    </Typography>
                                </InputAdornment>
                            )
                        }}
                        autoComplete='off'
                        fullWidth
                        placeholder='keyboard info'
                        multiline
                        rows={5}
                        sx={{
                            mt: 3,
                        }}
                        onChange={(e) => handleSetKeyboard(e.target.value)}
                    />

                    <DialogContentText sx={{ mt: 5 }}>social presence</DialogContentText>
                    <TextField
                        autoComplete='off'
                        fullWidth
                        placeholder='www.youtube.com/@example'
                        sx={{
                            mt: 1,
                        }}
                        onChange={(e) => handleSetYoutube(e.target.value)}
                    >
                    </TextField>
                    <TextField
                        autoComplete='off'
                        fullWidth
                        placeholder='www.instagram.com/example'
                        sx={{
                            mt: 3,
                        }}
                        onChange={(e)=> handleSetInstagram(e.target.value)}
                    >
                    </TextField>
                    <TextField
                        autoComplete='off'
                        fullWidth
                        placeholder='www.x.com/example'
                        sx={{
                            mt: 3,
                        }}
                        onChange={(e)=> handleSetX(e.target.value)}
                    >
                    </TextField>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        mt: 3,
                    }}>
                        <Button
                            variant='outlined'
                            sx={{
                                mr: 1,
                                padding: '0px',
                            }}
                            onClick={onClose}
                        >cancel</Button>
                        <Button
                            variant='contained'
                            onClick={() => handleSaveProfile()}
                        >save</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
