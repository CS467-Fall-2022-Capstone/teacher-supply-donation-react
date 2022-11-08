import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

export const LandingLayout = () => {
    const { teacher } = useAuth();

    if (teacher) {
        return <Navigate to='/teachers/dashboard' replace/>;
    }

    return <Outlet />;
};

export default LandingLayout;
