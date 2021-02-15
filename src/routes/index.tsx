import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import App from './app.routes';
import Auth from './auth.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
    const { logged } = useAuth();

    return ( 
        <BrowserRouter>
            { logged ? <App/> : <Auth /> }
        </BrowserRouter>
    )
};

export default Routes;