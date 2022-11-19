import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';
import ExpressService from '../services/express.service';
import Loading from './Loading';

export const LandingLayout = () => {
    const { teacher } = useAuth();
    const [serverReady, setServerReady] = useState(false);

    useEffect(() => {
        async function getServerStatus() {
            try {
                const response = await ExpressService.pingServer();
                if (response.status === 200) {
                    console.log(response.data.status);
                    setServerReady(response.data.status);
                }
            } catch (err) {
                console.error(err);
            }
        }
        getServerStatus();
    }, []);

    if (teacher) {
        return <Navigate to='/teachers/dashboard' replace />;
    }

    return <>{!serverReady ? <Loading /> : <Outlet />}</>;
};

export default LandingLayout;
