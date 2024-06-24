import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function UserDataDisplay() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        clientCardNumber: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                if (jwtToken) {
                    const decodedToken = jwtDecode(jwtToken);
                    const userId = decodedToken.userId; // Make sure your JWT contains the userId

                    const response = await axios.get(`http://localhost:3001/user/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    });
                    setUser(response.data.user);
                    // console.log(response.data);
                }
            } catch (error) {
                //console.error("Error fetching user data:", error);
            }
        }
        fetchData();
    }, []);

    const handleForgetAccount = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const confirmForgetAccount = async () => {
        if (user && user._id) {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                await axios.patch(`http://localhost:3001/user/anonymize/${user._id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                //console.log('Account has been anonymized.');
                localStorage.removeItem('jwtToken');
                navigate('/');
            } catch (error) {
                //console.error("Error anonymizing user:", error);
            }
        }
        setShowPopup(false);
    };

    return (
        <div className="px-2 py-4 sm:p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-2 sm:mx-6 my-2 rounded-2xl">
                <div className="p-5 bg-transparent flex flex-row w-full place-content-between">
                    <div className='w-full xl:w-1/3'>
                        <h2 className="text-dark-orange text-lg font-bold mb-4">Mijn Gegevens</h2>
                        {/* Display user data here */}
                        <div className="mb-4">
                            <label className="block mb-2">Voornaam</label>
                            <p className="px-3 py-2 bg-white border border-green rounded">{user.firstName}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Achternaam</label>
                            <p className="px-3 py-2 bg-white border border-green rounded">{user.lastName}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <p className="px-3 py-2 bg-white border border-green rounded">{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Telefoon</label>
                            <p className="px-3 py-2 bg-white border border-green rounded">{user.phoneNumber}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Kaartnummer</label>
                            <p className="px-3 py-2 bg-white border border-green rounded">{user.clientCardNumber}</p>
                        </div>
                        {/* Edit and Forget account buttons */}
                        <div>
                            <div className='mb-4'>
                                <Link to="/edityourdata" className="inset-y-0 right-0 max-w-fit flex items-center text-sm leading-5 px-4 py-3 my-auto bg-orange text-white rounded"> 
                                    <span>Bewerk mijn account</span>
                                </Link>
                            </div>
                            <div>
                                <button 
                                    type="button" 
                                    className="inset-y-0 right-0 flex items-center text-sm leading-5 px-4 py-3 my-auto bg-red-600 text-white rounded"
                                    onClick={handleForgetAccount}
                                >
                                    Vergeet mijn account
                                </button>
                            </div>
                        </div>
                        {/* Popup for confirming account forget */}
                        {showPopup && (
                            <div className="sm:ml-64 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-5 rounded-lg w-3/5 relative">
                                    <button 
                                        className="absolute top-0 right-0 mt-2 mr-2 text-black"
                                        onClick={handleClosePopup}
                                    >
                                        &#x2715; {/* Unicode X symbol */}
                                    </button>
                                    <p>Als u op "Vergeet mijn account" klikt zal al uw informatie geanonimiseerd worden, en kunt u dit account niet meer gebruiken, weet u dit zeker?</p>
                                    <button 
                                        className="bg-orange text-white rounded px-4 py-2 mt-4"
                                        onClick={confirmForgetAccount}
                                    >
                                        Vergeet mijn account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='place-content-center mr-6 hidden xl:flex'>
                        <img
                            className="rounded-lg max-h-[540px]"
                            src='/orange-paw-logo.png'
                            alt="Plaatje"
                        ></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDataDisplay;
