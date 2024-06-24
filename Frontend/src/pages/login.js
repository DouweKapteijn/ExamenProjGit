import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        clientCardNumber: '',
        password: ''
    });

    const [loginErrors, setLoginErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const validatePassword = (password) => password.length >= 8 && /[A-Z]/.test(password) && /[!?]/.test(password);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (!validatePassword(loginData.password)) {
            errors.password = 'Wachtwoord niet mogelijk.';
        }

        setLoginErrors(errors);
        setApiError(''); // Reset API error message

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3001/auth/login', {
                    email: loginData.email,
                    clientCardNumber: loginData.clientCardNumber,
                    password: loginData.password
                });
                const decodedToken = parseJwt(response.data.accessToken);

                localStorage.setItem('jwtToken', response.data.accessToken);
                navigate('/'); // Redirect to homepage after successful login
            } catch (error) {
                if (error.response && error.response.data) {
                    setApiError(error.response.data.message);
                } else {
                    setApiError('Er is een fout opgetreden tijdens het inloggen.');
                }
            }
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Inlog</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className='mb-4'>
                            <div className="w-full">
                                <label htmlFor="emailorcustomernumber" className="block mb-2">Email of Klantnummer</label>
                                <div className='flex flex-col md:flex-row gap-y-3 gap-x-5 '>
                                    {/* Email */}
                                    <input type="email" placeholder='Email' id="email" className="w-full px-3 py-2 border border-green rounded" value={loginData.email} onChange={handleLoginChange} />
                                    {loginErrors.email && <p className="text-red-500 text-xs">{loginErrors.email}</p>}
                                    {/* Client Card Number */}
                                    <input type="text" placeholder='Klantnummer' id="clientCardNumber" className="w-full px-3 py-2 border border-green rounded" value={loginData.clientCardNumber} onChange={handleLoginChange} />
                                </div>
                            </div>
                        </div>
                        {/* Password */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block mb-2">Wachtwoord</label>
                            <div className='flex flex-row'>
                                <input type={showPassword ? "text" : "password"} id="password" className="w-full px-3 py-2 border border-green rounded" value={loginData.password} onChange={handleLoginChange} />
                                <button type="button" onClick={togglePasswordVisibility} className="inset-y-0 right-0 flex items-center text-sm leading-5 px-2 py-1 ml-2 my-auto bg-orange text-white rounded">
                                    {showPassword ? 'Verberg' : 'Toon'}
                                </button>
                            </div>
                            {loginErrors.password && <p className="text-red-500 text-xs">{loginErrors.password}</p>}
                        </div>
                        {/* Error Message */}
                        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
                        {/* Submit Button */}
                        <button type="submit" className="w-full px-3 py-2 bg-orange text-white rounded">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
