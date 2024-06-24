import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ChangeUserInfo() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        clientCardNumber: '',
        accountStatus: "active",
        role: ''
    });
    // const [originalData, setOriginalData] = useState({}); // State to store the original data
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                setIsLoading(true);
                const response = await axios.get(`http://localhost:3001/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                const userData = response.data.user;             

                setFormData({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    phoneNumber: userData.phoneNumber || '',
                    password: userData.password || '',
                    clientCardNumber: Array.isArray(userData.clientCardNumber) && userData.clientCardNumber.length > 0
                        ? userData.clientCardNumber[0]
                        : '',
                    accountStatus: userData.accountStatus === "active" ? "active" : "inactive",
                    role: userData.role || 'customer'
                });
            } catch (error) {
               // console.error('Error fetching user data:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
    
        if (!validateEmail(formData.email)) {
            errors.email = 'Ongeldig e-mailadres.';
        }
    
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const { ...submittedData } = formData;
                const dataToSend = { ...submittedData }; // Merge original data with updated data
                console.log('Data to send:', dataToSend);
    
                const response = await axios.patch(`http://localhost:3001/user/${id}`, dataToSend, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
            } catch (error) {
                //console.error("Error updating user data:", error);
                // Handle update error here
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data!</p>;

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
            <Link to="/userdata" className="text-dark-green font-bold m-4">
            Terug naar overzicht
            </Link>
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Gegevens Wijzigen</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Voornaam */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block mb-2">Voornaam</label>
                            <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.firstName} onChange={handleChange} />
                        </div>
                        {/* LastName */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block mb-2">Achternaam</label>
                            <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.lastName} onChange={handleChange} />
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.email} onChange={handleChange} />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                        </div>
                        {/* Telefoon */}
                        <div className="mb-4">
                            <label htmlFor="telefoon" className="block mb-2">Telefoon</label>
                            <input type="tel" id="telefoon" name="phoneNumber" className="w-full px-3 py-2 border border-green rounded" placeholder={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        {/* Actief */}
                        <div className="mb-4">
                            <label className="block mb-2">Actief</label>
                            <div>
                                <label>
                                    <input type="radio" id="actief-yes" name="accountStatus" value="active" checked={formData.accountStatus === "active"} onChange={handleChange} />
                                    Ja
                                </label>
                                <label className="ml-4">
                                    <input type="radio" id="actief-no" name="accountStatus" value="inactive" checked={formData.accountStatus === "inactive"} onChange={handleChange} />
                                    Nee
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="w-full px-3 py-2 bg-orange text-white rounded">Gegevens Bijwerken</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeUserInfo;
