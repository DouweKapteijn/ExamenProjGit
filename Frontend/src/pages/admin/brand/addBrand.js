import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddBrand() {
  const navigate = useNavigate();
  const [brand, setBrandData] = useState({
    brandName: "",
    animalName: "",
  });

  const handleChange = (e) => {
    setBrandData({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/createMerk",
        brand,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log("Added successfully:", response.data);
      navigate("/branddata");
    } catch (error) {
      //console.error('Error adding:', error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
        <Link to="/branddata" className="text-dark-green font-bold m-4">
          Terug naar overzicht
        </Link>
        <div className="max-w-3xl mx-auto p-5 bg-transparent">
          <h2 className="text-dark-orange text-lg font-bold mb-4">
            Merk Toevoegen
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>
                Merk
                <input
                  type="text"
                  placeholder="Merk"
                  name="brandName"
                  value={brand.brandName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Dier
                <input
                  type="text"
                  placeholder="Dier"
                  name="animalName"
                  value={brand.animalName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </label>
            </div>
            <Link to="/productdata">
              <button
                onClick={handleSubmit}
                className="w-full px-3 py-2 bg-orange text-white rounded"
              >
                Merk Toevoegen
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;
