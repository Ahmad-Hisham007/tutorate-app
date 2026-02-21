import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from "../../Firebase/Firebase.init"
import toast from 'react-hot-toast';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');
    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);
    console.log(user)

    // Register function
    const handleRegister = async (data) => {

        const email = await data.email;
        const password = await data.password;
        const photoURL = await data.photoURL;

        try {
            setLoading(true);

            //Create user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL
            });

            // const newUser = {
            //     uid: user.uid,
            //     displayName: name,
            //     email: email,
            //     photoURL: photoURL,
            //     registeredAt: new Date().toISOString()
            // }
            // if (user.uid) {
            //     const response = await fetch('https://civiconnect-server.vercel.app/users', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(newUser)
            //     });
            //     if (!response.ok) {
            //         throw new Error('Failed to create user in database');
            //     }
            // }


            // Success
            setError('');
            setLoading(false);
            // setIsAuthenticated(true);
            toast.success('Account created successfully!');

        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(`Registration failed: ${error.message}`);
            setLoading(false);
        }

    };

    // Login function
    const handleLogin = async (data) => {
        const email = await data.email;
        const password = await data.password;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // eslint-disable-next-line no-unused-vars
                const user = userCredential.user;
                toast.success('Login Successful');
                setError('');
                setLoading(false)
                // setIsAuthenticated(true);
            })
            .catch((err) => {
                const errorMessage = err.message;
                toast.error(`Login Failed: ${errorMessage}`);
            });

    }

    // Log out function

    const logOut = () => {
        return signOut(auth);
    }
    const authData = {
        user,
        handleRegister,
        handleLogin,
        logOut,
        loading,
        setLoading
    };
    return <AuthContext.Provider value={authData} >
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;