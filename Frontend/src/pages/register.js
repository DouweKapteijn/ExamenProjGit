import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        clientCardNumber: '',
        role: 'customer',
    });
    const [formErrors, setFormErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 8 && /[A-Z]/.test(password) && /[!?]/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (!formData.email || !validateEmail(formData.email)) {
            errors.email = 'Ongeldig e-mailadres.';
        }
        if (!formData.password || !validatePassword(formData.password)) {
            errors.password = 'Wachtwoord moet langer zijn dan 8 tekens, een hoofdletter en een speciaal teken bevatten.';
        }
        if (formData.password !== formData.passwordConfirm) {
            errors.passwordConfirm = 'Wachtwoorden komen niet overeen.';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                clientCardNumber: [formData.clientCardNumber],
                role: formData.role
            };

            try {
                await axios.post('http://localhost:3001/auth/register', userData);
                navigate('/login'); // Redirect to login page
            } catch (error) {
                if (error.response && error.response.data) {
                    setApiError(error.response.data.message);
                } else {
                    setApiError('Er is een fout opgetreden tijdens het registreren.');
                }
            }
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Registreren</h2>
                    <form onSubmit={handleSubmit}>
                        {/* firstName */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block mb-2">Voornaam</label>
                            <input required type="text" id="firstName" className="w-full px-3 py-2 border border-green rounded" value={formData.firstName} onChange={handleChange} />
                        </div>
                        {/* lastName */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block mb-2">Achternaam</label>
                            <input required type="text" id="lastName" className="w-full px-3 py-2 border border-green rounded" value={formData.lastName} onChange={handleChange} />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input required type="email" id="email" className="w-full px-3 py-2 border border-green rounded" value={formData.email} onChange={handleChange} />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                        </div>
                        {/* phoneNumber */}
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block mb-2">Telefoon</label>
                            <input required type="tel" id="phoneNumber" className="w-full px-3 py-2 border border-green rounded" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        {/* password */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block mb-2">password</label>
                            <div className='flex flex-row'>
                                <input required type={showPassword ? "text" : "password"} id="password" className="w-full px-3 py-2 border border-green rounded" value={formData.password} onChange={handleChange} />
                                <button type="button" onClick={togglePasswordVisibility} className="inset-y-0 right-0 flex items-center text-sm leading-5 px-2 py-1 ml-2 my-auto bg-orange text-white rounded">
                                    {showPassword ? 'Verberg' : 'Toon'}
                                </button>
                            </div>
                            {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
                        </div>
                        {/* password Confirm */}
                        <div className="mb-4 relative">
                            <label htmlFor="passwordConfirm" className="block mb-2">Bevestig password</label>
                            <div className='flex flex-row'>
                                <input required type={showConfirmPassword ? "text" : "password"} id="passwordConfirm" className="w-full px-3 py-2 border border-green rounded" value={formData.passwordConfirm} onChange={handleChange} />
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="inset-y-0 right-0 flex items-center text-sm leading-5 px-2 py-1 ml-2 my-auto bg-orange text-white rounded">
                                    {showConfirmPassword ? 'Verberg' : 'Toon'}
                                </button>
                            </div>
                            {formErrors.passwordConfirm && <p className="text-red-500 text-xs">{formErrors.passwordConfirm}</p>}
                        </div>
                        {/* clientCardNumber */}
                        <div className="mb-4">
                            <label htmlFor="clientCardNumber" className="block mb-2">Klantnummer</label>
                            <input required type="text" id="clientCardNumber" className="w-full px-3 py-2 border border-green rounded" value={formData.clientCardNumber} onChange={handleChange} />
                        </div>
                        {/* Beleid Confirmatie */}
                        <div className="mb-4">
                            <p>Als je registreert betekent dit dat je akkoord gaat met on privacy beleid</p>
                            <Link to="/privacy" className="text-blue-700 font-bold m-4">
                                Privacy Beleid
                            </Link>
                        </div>
                        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
                        <button type="submit" className="w-full px-3 py-2 bg-orange text-white rounded">Registreren</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
