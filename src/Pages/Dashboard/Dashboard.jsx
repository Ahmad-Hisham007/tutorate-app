import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { Navigate } from 'react-router';
import Profile from '../Profile/Profile';

const Dashboard = () => {
    const user = useContext(AuthContext);
    if (!user) return <Navigate to="/login"></Navigate>
    return <Profile></Profile>
};

export default Dashboard;