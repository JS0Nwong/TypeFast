import { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../configs/firebase";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoading(false)
            if(user) {
                setIsLoggedIn(user)
            } else {
                setIsLoggedIn(false)
            }
        })
        return () => unsub()
    }, [])    

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                auth,
            }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return (useContext(AuthContext)) }

export default AuthContext