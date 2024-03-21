import { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, } from "firebase/firestore";
import { auth, db } from "../configs/firebase";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsLoading(false)
            if(user) {
                try {
                    const userDocRef = doc(db, "users", auth.currentUser.uid);
                    const userDoc = getDoc(userDocRef).then((doc) => {
                        if (doc.exists()) {
                            setUserData(doc.data())
                        } else {
                            console.log("User does not exist!");
                        }
                    });
                    setIsLoggedIn(user)
                } catch (error) {
                    console.log(error)
                    setIsLoggedIn(user)
                }
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
                userData,
            }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return (useContext(AuthContext)) }

export default AuthContext