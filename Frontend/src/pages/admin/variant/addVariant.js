import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddVariant() {
  const navigate = useNavigate();
  const [variant, setVariantData] = useState({
    variantName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setVariantData({
      ...variant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   console.log(variant);
      if (variant.variantName === "") {
        setError("geen text ingevoerd");
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/createVariant",
          variant,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        //console.log('Added successfully:', response.data);
        navigate("/variantdata");
      }
    } catch (error) {
      console.error("Error adding:", error);
      if (
        error.response.data ===
        `er gaat iets mis: E11000 duplicate key error collection: test.variants index: variantName_1 dup key: { variantName: "${variant.variantName}" }`
      ) {
        setError("variant bestaat al");
      }
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
      <Link to="/variantdata" className="text-dark-green font-bold m-4">
      Terug naar overzicht
      </Link>
        <div className="max-w-3xl mx-auto p-5 bg-transparent">
          <h2 className="text-dark-orange text-lg font-bold mb-4">
            Variant Toevoegen
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>
                Variant
                <input
                  type="text"
                  placeholder="Variant"
                  name="variantName"
                  value={variant.variantName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </label>
            </div>
            {error}
            <Link to="/productdata">
              <button
                onClick={handleSubmit}
                className="w-full px-3 py-2 bg-orange text-white rounded"
              >
                Product Toevoegen
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVariant;
