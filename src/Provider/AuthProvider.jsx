import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

const createUser  = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

const logIn =(email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
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

}


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;