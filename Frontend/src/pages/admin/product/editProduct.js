import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const navigate = useNavigate();
  const jwttoken = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [variantName, setVariantName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:3001/product/${id}`,
        { productName, brandName, variantName },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
        navigate("/productdata");
      })
      .catch((error) => {
        //console.error(error);
        //console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
        <Link to="/productdata" className="text-dark-green font-bold m-4">
        Terug naar overzicht
        </Link>
          <div className="max-w-3xl mx-auto p-5 bg-transparent">
            <h2 className="text-dark-orange text-lg font-bold mb-4">
              Gegevens Wijzigen
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Product</label>
                <input
                  type="text"
                  id="rasName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-green rounded"
                ></input>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Merk</label>
                <input
                  type="text"
                  id="animalName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Variant</label>
                <input
                  type="text"
                  id="animalName"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 bg-orange text-white rounded"
              >
                Gegevens Bijwerken
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
