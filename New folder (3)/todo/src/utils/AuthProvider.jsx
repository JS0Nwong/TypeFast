import { useContext, useState, useEffect, createContext } from 'react'
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth'
import useStore from '../store'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    const { loader, setAuth } = useStore()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoading(false)
            if(user) {
                setCurrentUser(user)
            }
            else {
                setCurrentUser(null)
            }
        })
        return () => unsub()
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return (useContext(AuthContext)) }

export default AuthContext
