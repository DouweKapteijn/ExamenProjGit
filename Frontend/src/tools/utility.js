import { jwtDecode } from 'jwt-decode';

export const getUserRoleFromToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.role;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
};

