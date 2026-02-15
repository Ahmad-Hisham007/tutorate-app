import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from "../../Firebase/Firebase.init"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);
    console.log(user)
    const logOut = () => {
        return signOut(auth)
    }
    const authData = {
        user,
        logOut,
        loading,
        setLoading
    };
    return <AuthContext.Provider value={authData} >
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;