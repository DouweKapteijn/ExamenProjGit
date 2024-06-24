import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function EditVariant() {
  const navigate = useNavigate();
  const jwttoken = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const [variantName, setVariantName] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (variantName === "") {
      setError("geen text ingevoerd");
    } else {
      axios
        .patch(
          `http://localhost:3001/api/updateVariant/${id}`,
          { variantName },
          {
            headers: {
              Authorization: `Bearer ${jwttoken}`,
            },
          }
        )
        .then((response) => {
          //onsole.log(response.data);
          navigate("/variantdata");
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.error ===
            `E11000 duplicate key error collection: test.variants index: variantName_1 dup key: { variantName: "${variantName}" }`
          ) {
            setError("variant bestaat al");
          }
        });
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
        <Link to="/variantdata" className="text-dark-green font-bold m-4">
        Terug naar overzicht
        </Link>
          <div className="max-w-3xl mx-auto p-5 bg-transparent">
            <h2 className="text-dark-orange text-lg font-bold mb-4">
              Gegevens Wijzigen
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Variant</label>
                <input
                  type="text"
                  id="variantName"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  className="w-full px-3 py-2 border border-green rounded"
                ></input>
              </div>
              {error}
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

export default EditVariant;
