import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../firebase.config';
import { Toaster } from 'react-hot-toast';
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)

    const signInWithgoogle = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignOUt = () => {
        setLoader(true)
        localStorage.removeItem('token')
        return signOut(auth)
    }
    const JWTToken =  (loggedUser) => {
        fetch('http://localhost:3000/jwt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loggedUser)
        })
            .then(res => res.json())
            .then(d => {
                console.log(d)
                localStorage.setItem('token', d.token)
            })
            .catch(e => console.log(e))
    }

    const info = {
        user,
        signInWithgoogle,
        userSignOUt,
        createUser,
        loginUser,
        loader, 
        JWTToken, 



    }



    useEffect(() => {
        const unSub = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
               
            }

        })
        return () => {
            unSub()
        }
    }, [])

    return (
        <AuthContext.Provider value={info}>{children} <Toaster /> </AuthContext.Provider>
    );
};

export default AuthProvider;