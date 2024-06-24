import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function DeleteDier() {
    const navigate = useNavigate();
    const jwttoken = localStorage.getItem("jwtToken");
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwttoken}`, // Use jwttoken instead of localStorage.getItem('jwttoken')
                },
            });
            //console.log('Deleted successfully:', response.data);
            navigate('/productdata');
        } catch (error) {
            //console.error('Error deleting:', error);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
            <Link to="/productdata" className="text-dark-green font-bold m-4">
            Terug naar overzicht
            </Link>
                <div className="max-w-3xl mx-auto p-5 bg-transparent">
                    <h2 className="text-dark-orange text-lg text-center font-bold mb-4">Weet u zeker dat u dit product wil verwijderen?</h2>
                    <button onClick={handleDelete} className="w-full px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded">Product Verwijderen</button>                </div>
            </div>
        </div>
    );
}

export default DeleteDier;