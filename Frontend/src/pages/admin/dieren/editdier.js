import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditDier() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    const { id } = useParams();
    const [rasName, setRasName] = useState('');
    const [animalName, setAnimalName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Edit functie
        axios.patch(`http://localhost:3001/api/updateRas/${id}`, { rasName, animalName }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                navigate('/adminDieren');
            })
            .catch(error => {
                // Handle the error
                //console.error(error);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/getOneRas/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                setRasName(response.data.rasName);
                setAnimalName(response.data.animal_id.animalName);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            });
    }, []); 

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
            <Link to="/adminDieren" className="text-dark-green font-bold m-4">
            Terug naar overzicht
            </Link>
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Gegevens Wijzigen</h2>
                    <form onSubmit={handleSubmit}>
                        {/* rasName */}
                        <div className="mb-4">
                            <label className="block mb-2">Ras</label>
                            <input
                                type="text"
                                id="rasName"
                                placeholder={rasName}
                                value={rasName}
                                onChange={(e) => setRasName(e.target.value)}
                                className="w-full px-3 py-2 border border-green rounded"/>
                        </div>
                        {/* animalName */}
                        <div className="mb-4">
                            <label className="block mb-2">Dier Soort</label>
                            <input
                                type="text"
                                id="animalName"
                                placeholder={animalName}
                                value={animalName}
                                onChange={(e) => setAnimalName(e.target.value)}
                                className="w-full px-3 py-2 border border-green rounded"/>
                        </div>
                        <button type="submit" className="w-full px-3 py-2 bg-orange text-white rounded">Gegevens Bijwerken</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditDier;