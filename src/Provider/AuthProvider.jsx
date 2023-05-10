import { getApp } from 'firebase/app';
import React, { createContext, useState } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const auth = getApp(app)

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(null)

const userInfo = {
    user,
    loading,
}


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;