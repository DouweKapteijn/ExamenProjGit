import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function AddYourPet() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(jwtToken);
    const userId = decodedToken.userId; // Make sure your JWT contains the userId
    const [animalNames, setAnimalNames] = useState([]);
    const [rasNames, setRasNames] = useState([]);
    const [ras, setRasData] = useState({
        petName: '',
        birthDate: '',
        user_id: `${userId}`,
        rasName: '',
        animalName: '',
        productName: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3001/api/getAnimal', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
        .then(response => {
            setAnimalNames(response.data);
        })
        .catch(error => {
            //console.error(error);
        });
    }, []);

    useEffect(() => {
        if (ras.animal_id) {
            axios.get(`http://localhost:3001/api/getRas/${ras.animal_id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then(response => {
                setRasNames(response.data);
            })
            .catch(error => {
                //console.error(error);
                //console.log(error.response.data);
            });
        }
    }, [ras.animal_id]);

    const handleChange = (e) => {
        setRasData((prevRas) => ({
            ...prevRas,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/createPet', ras, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            //console.log('Added successfully:', response.data);
            navigate('/yourPets');
        } catch (error) {
            //console.error('Error adding:', error);
            //console.error(error.response.data);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
                <Link to="/yourpets" className="text-dark-green font-bold m-4">
                Terug naar overzicht
                </Link>
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg font-bold mb-4">Huisdier Toevoegen</h2>
                    <form onSubmit={handleSubmit}>
                        {/* petName */}
                        <div className="mb-4">
                            <label>
                                Naam
                                <input
                                    type="text"
                                    placeholder="Naam"
                                    name="petName"
                                    value={ras.petName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-green rounded"
                                />
                            </label>
                        </div>
                        {/* birthDate */}
                        <div className="mb-4">
                            <label>
                                Geboortedatum
                                <input max={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    placeholder="Geboortedatum"
                                    name="birthDate"
                                    value={ras.birthDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-green rounded"
                                />
                            </label>
                        </div>
                        {/* Soort */}
                        <div className="mb-4">
                        <label>
                            Soort
                            <input
                                type="text"
                                placeholder="Soort"
                                name="animalName"
                                value={ras.animalName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-green rounded"
                            />
                        </label>
                        </div>
                        {/* Ras */}
                        <div className="mb-4">
                            <label>
                                Ras
                                <input
                                    type="text"
                                    placeholder="Ras (optioneel)"
                                    name="rasName"
                                    value={ras.rasName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-green rounded"
                                />
                            </label>                       
                        </div>
                        {/* Product */}
                        <div className="mb-4">
                            <label>
                                Product
                                <input
                                    type="text"
                                    placeholder="Product (optioneel)"
                                    name="productName"
                                    value={ras.productName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-green rounded"
                                />
                            </label>
                        </div>
                        <Link to="/yourpets">
                            <button onClick={handleSubmit} className="w-full px-3 py-2 bg-orange text-white rounded">Huisdier Toevoegen</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddYourPet;