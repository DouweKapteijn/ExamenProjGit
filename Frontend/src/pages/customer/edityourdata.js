import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function ChangeUserInfo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        voornaam: '',
        achternaam: '',
        email: '',
        telefoon: '',
        wachtwoord: '',
        wachtwoordConfirm: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const decodedToken = jwtDecode(jwtToken);
                const userId = decodedToken.userId;

                const response = await axios.get(`http://localhost:3001/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                setFormData({
                    voornaam: response.data.user.firstName || '',
                    achternaam: response.data.user.lastName || '',
                    email: response.data.user.email || '',
                    telefoon: response.data.user.phoneNumber || '',
                    wachtwoord: response.data.user.password || '',
                    wachtwoordConfirm: response.data.user.password || ''
                });
            } catch (error) {
                //console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
    const validatePassword = (password) => password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%&*?]/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (formData.email && !validateEmail(formData.email)) {
            errors.email = 'Ongeldig e-mailadres.';
        }

        if (formData.wachtwoord && !validatePassword(formData.wachtwoord)) {
            errors.wachtwoord = 'Wachtwoord moet langer zijn dan 8 tekens, een hoofdletter en een speciaal teken bevatten.';
        }

        if (formData.wachtwoord !== formData.wachtwoordConfirm) {
            errors.wachtwoordConfirm = 'Wachtwoorden komen niet overeen.';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const decodedToken = jwtDecode(jwtToken);
                const userId = decodedToken.userId;
    
                const updatedData = {
                    firstName: formData.voornaam,
                    lastName: formData.achternaam,
                    email: formData.email,
                    phoneNumber: formData.telefoon,
                    password: formData.wachtwoord,  
                    // ...(formData.wachtwoord && { password: formData.wachtwoord }),
                };
    
                //console.log('Sending data:', updatedData); // Log the data being sent
    
                const response = await axios.patch(`http://localhost:3001/user/${userId}`, updatedData, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        //console.log(response.data);
                        navigate("/yourdata");
                    })
                ;
    
                //console.log('Update response:', response.data);
                // Handle successful update here
    
            } catch (error) {
                //console.error("Error updating user data:", error);
            }
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
            <Link to="/yourdata" className="text-dark-green font-bold m-4">
            Terug naar overzicht
            </Link>
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Gegevens Wijzigen</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Voornaam */}
                        <div className="mb-4">
                            <label htmlFor="voornaam" className="block mb-2">Voornaam</label>
                            <input type="text" id="voornaam" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.voornaam} onChange={handleChange} />
                        </div>
                        {/* Achternaam */}
                        <div className="mb-4">
                            <label htmlFor="achternaam" className="block mb-2">Achternaam</label>
                            <input type="text" id="achternaam" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.achternaam} onChange={handleChange} />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.email} onChange={handleChange} />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                        </div>
                        {/* Telefoon */}
                        <div className="mb-4">
                            <label htmlFor="telefoon" className="block mb-2">Telefoon</label>
                            <input type="tel" id="telefoon" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.telefoon} onChange={handleChange} />
                        </div>
                        {/* Wachtwoord */}
                        <div className="mb-4 relative">
                            <label htmlFor="wachtwoord" className="block mb-2">Nieuw Wachtwoord</label>
                            <div className='flex flex-row'>
                                <input type={showPassword ? "text" : "password"} id="wachtwoord" className="w-full px-3 py-2 border border-green rounded" onChange={handleChange} />
                                <button type="button" onClick={togglePasswordVisibility} className="inset-y-0 right-0 flex items-center text-sm leading-5 px-2 py-1 ml-2 my-auto bg-orange text-white rounded">
                                    {showPassword ? 'Verberg' : 'Toon'}
                                </button>
                            </div>
                            {formErrors.wachtwoord && <p className="text-red-500 text-xs">{formErrors.wachtwoord}</p>}
                        </div>
                        {/* Wachtwoord Confirm */}
                        <div className="mb-4 relative">
                            <label htmlFor="wachtwoordConfirm" className="block mb-2">Bevestig Nieuw Wachtwoord</label>
                            <div className='flex flex-row'>
                                <input type={showConfirmPassword ? "text" : "password"} id="wachtwoordConfirm" className="w-full px-3 py-2 border border-green rounded" onChange={handleChange} />
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="inset-y-0 right-0 flex items-center text-sm leading-5 px-2 py-1 ml-2 my-auto bg-orange text-white rounded">
                                    {showConfirmPassword ? 'Verberg' : 'Toon'}
                                </button>
                            </div>
                            {formErrors.wachtwoordConfirm && <p className="text-red-500 text-xs">{formErrors.wachtwoordConfirm}</p>}
                        </div>
                        <button type="submit" className="w-full px-3 py-2 bg-orange text-white rounded">Gegevens Bijwerken</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeUserInfo;
