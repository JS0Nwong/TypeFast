import { useState } from 'react'
import { Typography, Input, Box, Button, Stack } from '@mui/material'
import { auth } from "./firebase"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import useStore from './store';

import { useNavigate } from 'react-router-dom';

export default function LoginView() {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const { setAuth } = useStore()

    const navigate = useNavigate()

    const authText = isLogin ?
        "Do not have an account?" :
        "Have an account already?"

    const onSubmit = async () => {
        try {
            isLogin ?
                await signInWithEmailAndPassword(auth, username, password) :
                await createUserWithEmailAndPassword(auth, username, password)
            navigate("/boards")
            setAuth(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: 'center',
                height: "100dvh",
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    background: 'rgb(17 17 17)',
                    border: "1px solid rgb(64 64 64)",
                    borderRadius: "4px",
                    p: 4
                }}>
                    <Typography
                        fontWeight="600"
                        sx={{
                            mb: 4
                        }}>
                        {isLogin ? "Login" : "Register"}
                    </Typography>
                    <Stack spacing={2}>
                        <Input
                            type='email'
                            name='email'
                            placeholder="Email"
                            disableUnderline
                            sx={{
                                color: "#FFFFFF",
                                pl: 1,
                                pr: 1,
                                overflow: "visible",
                                fontWeight: "500",
                                border: "1px solid #555",
                                borderRadius: "4px",
                                "&.MuiInputBase-root ": {
                                    "&.Mui-focused ": {
                                        border: "1px solid #aaa"
                                    }
                                }
                            }}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            type="password"
                            name='password'
                            placeholder="Password"
                            disableUnderline
                            sx={{
                                color: "#FFFFFF",
                                pl: 1,
                                pr: 1,
                                overflow: "visible",
                                fontWeight: "500",
                                border: "1px solid #555",
                                borderRadius: "4px",
                                "&.MuiInputBase-root ": {
                                    "&.Mui-focused ": {
                                        border: "1px solid #aaa"
                                    }
                                }
                            }}
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Stack>
                    <Button
                        disabled={loading || !username.trim() || !password.trim()}
                        disableRipple
                        variant='contained'
                        sx={{
                            mt: 2,
                            "&.Mui-disabled": {
                                background: 'rgb(28 25 23)',
                                color: "rgb(115 115 115)",
                            },
                            fontWeight: "600"
                        }}
                        onClick={onSubmit}
                    >
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    <Typography
                        fontSize="12px"
                        sx={{
                            cursor: "pointer",

                        }}
                        onClick={() => setIsLogin(!isLogin)}
                        mt={7}
                        textAlign="center"
                    >
                        {authText}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
