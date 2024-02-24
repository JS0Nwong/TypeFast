import { useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Stack,
    FormControl,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

export default function Auth() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPass, setConfirmPass] =  useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)

    const { emailAndPassAuth, popUpAuth } = useAuth()

    const handleError = () => {

    }

    const handleAuthSubmit = () => {
        email.trim() !== "" && pass.trim() !== ""
        if (isLogin) {
            emailAndPassAuth(isLogin, email.trim(), pass.trim(), username.trim())
        }
        else {
            email.trim() === confirmEmail.trim() 
            && pass.trim() === confirmPass.trim()
            && username.trim() !== "" ?
                emailAndPassAuth(isLogin, email.trim(), pass.trim(), username.trim()) :
                handleError()
        }
    }

    const handleSignInWithPopUp = () => {
        if (isLogin) {   
            popUpAuth()         
        } else {
            popUpAuth()
        }
    }

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Stack
                spacing={2}
                direction="column"
            >
                <Typography>
                    {isLogin ? 'login' : 'register'}
                </Typography>
                <FormControl sx={{ background: 'none', width: '400px' }}>
                    <form aria-label='login' style={{ background: 'none' }}>
                        <Stack
                            spacing={2}
                            direction="column"
                            sx={{
                                transition: "0.35s ease"
                            }}
                        >
                            {!isLogin ?
                                <TextField
                                    autoComplete='off'
                                    placeholder='username'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                : <></>}
                            <TextField
                                autoComplete='off'
                                placeholder='email'
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!isLogin ?
                                <TextField
                                    autoComplete='off'
                                    placeholder='confirm email'
                                    type='email'
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                />
                                : <></>}
                            <TextField
                                autoComplete='off'
                                placeholder='password'
                                type='password'
                                onChange={(e) => setPass(e.target.value)}
                            />
                            {!isLogin ?
                                <TextField
                                    autoComplete='off'
                                    placeholder='confirm password'
                                    type='password'
                                    onChange={(e) => setConfirmPass(e.target.value)}

                                />
                                : <></>}
                        </Stack>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    name="gilad"
                                    disableRipple
                                />
                            }
                            label="Remember me?"
                            sx={{
                                justifyContent: 'flex-end',
                                p: 0,
                                m: 0,
                                width: "100%",
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                mt: 5,
                                width: '100%',
                                p: 1
                            }}
                            onClick={() => handleAuthSubmit()}
                        >
                            {isLogin ? 'Login' : "register"}
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                mt: 2,
                                width: '100%',
                                p: 1
                            }}
                            onClick={() => handleSignInWithPopUp()} 
                        >
                            {isLogin ?' Login with Google' : 'register with google'}
                        </Button>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{
                                mt: 1,
                            }}
                        >
                            <Button variant='text' onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Don't have an account?" : 'Have an account already?'}
                            </Button>
                            <Button variant='text'>
                                Forgot password?

                            </Button>
                        </Stack>
                    </form>
                </FormControl>
            </Stack>
        </Box>
    )
}
