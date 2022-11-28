import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ExpressService from '../services/express.service';
import Loading from './Loading';

export const LandingLayout = () => {
    const [serverReady, setServerReady] = useState(false);

    useEffect(() => {
        async function getServerStatus() {
            try {
                const response = await ExpressService.pingServer();
                if (response.status === 200) {
                    setServerReady(response.data.status);
                }
            } catch (err) {
                console.error(err);
            }
        }
        getServerStatus();
    }, []);

    return <>{!serverReady ? <Loading /> : <Outlet />}</>;
};

export default LandingLayout;
