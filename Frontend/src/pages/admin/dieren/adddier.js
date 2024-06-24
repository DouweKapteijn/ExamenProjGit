import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddDier() {
  const navigate = useNavigate();
  const [ras, setRasData] = useState({
    rasName: "",
    animalName: "",
  });

  const handleChange = (e) => {
    setRasData({
      ...ras,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/createRas",
        ras,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      navigate("/adminDieren");
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
        <Link to="/adminDieren" className="text-dark-green font-bold m-4">
          Terug naar overzicht
        </Link>
        <div className="max-w-3xl mx-auto p-5 bg-transparent">
          <h2 className="text-dark-orange text-lg font-bold mb-4">
            Ras Toevoegen
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Ras */}
            <div className="mb-4">
              <label>
                Ras
                <input
                  type="text"
                  placeholder="Ras"
                  name="rasName"
                  value={ras.rasName}
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
            <Link to="/adminDieren">
              <button
                onClick={handleSubmit}
                className="w-full px-3 py-2 bg-orange text-white rounded"
              >
                Ras Toevoegen
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDier;
