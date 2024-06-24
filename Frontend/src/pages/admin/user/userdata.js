import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserData() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:3001/user/', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                const formattedUsers = response.data
                    .filter(user => user.role === "customer")
                    .map(user => ({
                        _id: user._id,
                        voornaam: user.firstName,
                        achternaam: user.lastName,
                        email: user.email,
                        telefoon: user.phoneNumber,
                        kaartnummer: user.clientCardNumber.length > 0 ? user.clientCardNumber[0] : '',
                        showPopup: false
                    }));
                setUsers(formattedUsers);
            } catch (error) {
                //console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleEditUser = (id) => {
        navigate(`/edituserdata/${id}`);
    };

    const handleForgetAccount = (kaartnummer) => {
        setUsers(users.map(user => user.kaartnummer === kaartnummer ? { ...user, showPopup: true } : user));
    };

    const handleClosePopup = (kaartnummer) => {
        setUsers(users.map(user => user.kaartnummer === kaartnummer ? { ...user, showPopup: false } : user));
    };

    const anonymizeAccount = async (kaartnummer) => {
        const userToAnonymize = users.find(user => user.kaartnummer === kaartnummer);
        if (userToAnonymize) {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                await axios.patch(`http://localhost:3001/user/anonymize/${userToAnonymize._id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                setUsers(users.map(user => user.kaartnummer === kaartnummer ? { ...user, voornaam: 'anoniem', achternaam: 'anoniem', email: 'anoniem', telefoon: 'anoniem', accountStatus: 'inactive', role: 'anoniem' } : user));
            } catch (error) {
                console.error("Error anonymizing user:", error);
            }
        }
    };

    const confirmForgetAccount = (kaartnummer) => {
        anonymizeAccount(kaartnummer).then(() => {
            window.location.reload();
        });
    };

    if (users.length === 0) return <p>Loading...</p>;

    return (
        <div className="p-4 sm:ml-64">
            <Link to="/register" className="inset-y-0 right-0 flex items-center text-sm leading-5 px-4 py-3 my-auto bg-orange max-w-fit text-white rounded-lg mb-4">
                Nieuwe Klant
            </Link>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase bg-light-green">
                        <tr>
                            <th scope="col" className="px-6 py-3">Voornaam</th>
                            <th scope="col" className="px-6 py-3">Achternaam</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Telefoon</th>
                            <th scope="col" className="px-6 py-3">Kaartnummer</th>
                            <th scope="col" className="px-6 py-3">Bewerk</th>
                            <th scope="col" className="px-6 py-3">Verwijder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.kaartnummer} className="odd:bg-green even:bg-light-green">
                                <td className="px-6 py-4">{user.voornaam}</td>
                                <td className="px-6 py-4">{user.achternaam}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.telefoon}</td>
                                <td className="px-6 py-4">{user.kaartnummer}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEditUser(user._id)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            className="h-8"
                                        >
                                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                        </svg>
                                        </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="inset-y-0 right-0 flex items-center text-sm leading-5 px-4 py-3 my-auto bg-red-600 text-white rounded" onClick={() => handleForgetAccount(user.kaartnummer)}>
                                        Vergeet account
                                    </button>
                                    {user.showPopup && (
                                        <div className="sm:ml-64 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-5 rounded-lg w-3/5 relative">
                                                <button 
                                                    className="absolute top-0 right-0 mt-2 mr-2 text-black"
                                                    onClick={() => handleClosePopup(user.kaartnummer)}
                                                >
                                                    &#x2715;
                                                </button>
                                                <p>Als u op "Vergeet mijn account" klikt zal al uw informatie geanonimiseerd worden, en kunt u dit account niet meer gebruiken, weet u dit zeker?</p>
                                                <button 
                                                    className="bg-orange text-white rounded px-4 py-2 mt-4"
                                                    onClick={() => confirmForgetAccount(user.kaartnummer)}
                                                >
                                                    Vergeet account
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UserData;


