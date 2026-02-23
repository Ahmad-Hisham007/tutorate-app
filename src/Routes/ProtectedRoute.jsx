import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import Forbidden from '../Components/ForbiddenError/ForbiddenError';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading/Loading';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { isLoading: roleLoading, hasAnyRole } = useRole();

    // Show loading while checking auth or role
    if (authLoading || roleLoading) {
        return <Loading />;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check role permission
    if (!hasAnyRole(allowedRoles)) {
        return <Forbidden />;
    }

    return children;
};

export default ProtectedRoute;