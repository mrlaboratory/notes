import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Spinner from '../../components/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loader } = useContext(AuthContext)
    if (loader) {
        return <Spinner></Spinner>
    }

    if (user) {
        return <>{children}</>
    } else {

        return <Navigate to='/login' state={{ from: location }}></Navigate>
    }

};

export default PrivateRoute;