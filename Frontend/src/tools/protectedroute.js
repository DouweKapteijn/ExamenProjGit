import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from './utility'; // Pas het pad indien nodig aan

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = getUserRoleFromToken();

    const isUserLoggedIn = () => {
        const token = localStorage.getItem('jwtToken');
        return !!token;
    };

    if (!isUserLoggedIn() || !userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
