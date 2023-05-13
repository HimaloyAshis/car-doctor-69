import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
const googleProvider = new GoogleAuthProvider()

const createUser  = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

const logIn =(email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const logOut =()=>{
    setLoading(true)
    return signOut(auth)
}

const googleSignIn=()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

useEffect(()=>{
  const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser)
        console.log('current user', currentUser)
        setLoading(false)
    })
    return ()=>{
        return unsubscribe()
    }
},[])

const userInfo = {
    user,
    loading,
    createUser,
    logIn,
    logOut,
    googleSignIn,

}


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;