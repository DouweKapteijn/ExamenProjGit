import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function EditYourPet() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(jwtToken);
  const userId = decodedToken.userId; // Make sure your JWT contains the userId
  const [pet, setPet] = useState([]);
  const { id } = useParams();
  const [petName, setPetName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [rasName, setRasName] = useState("");
  const [productName, setProductName] = useState("");

  // console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    // edit functie
    axios
      .patch(
        `http://localhost:3001/api/updatePet/${id}/${userId}`,
        { petName, birthDate, animalName, rasName, productName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        navigate("/Yourpets");
      })
      .catch((error) => {
        // Handle the error
        //console.error(error);
        //console.log(error.response.data);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getOnePet/${id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const petData = response.data;
        setPet(petData);
        setPetName(petData.petName);
        setBirthDate(petData.birthDate);
        setAnimalName(petData.animal_id ? petData.animal_id.animalName : "");
        setRasName(petData.ras_id ? petData.ras_id.rasName : "");
        setProductName(petData.productName);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="bg-light-green text-dark-green mx-6 my-2 rounded-2xl">
        <Link to="/yourpets" className="text-dark-green font-bold m-4">
          Terug naar overzicht
        </Link>
        <div className="max-w-3xl mx-auto p-5 bg-transparent">
          <h2 className="text-dark-orange text-lg font-bold mb-4">
            Gegevens Huisdier Wijzigen
          </h2>
          <form onSubmit={handleSubmit}>
            {/* petName */}
            <div className="mb-4">
              <label className="block mb-2">Naam Huisdier</label>
              <input
                type="text"
                id="petName"
                placeholder={pet.petName}
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full px-3 py-2 border border-green rounded"
              />
            </div>
            {/* birthDate */}
            <div className="mb-4">
              <label className="block mb-2">Geboortedatum Huisdier</label>
              <input
                max={new Date().toISOString().split("T")[0]}
                type="date"
                id="birthDate"
                placeholder={pet ? pet.birthDate : "Birth Date"}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 border border-green rounded"
              />
            </div>
            {/* animalName */}
            <div className="mb-4">
              <label className="block mb-2">Dieren Soort</label>
              <input
                type="text"
                id="birthDate"
                placeholder={
                  pet && pet.animal_id
                    ? pet.animal_id.animalName
                    : "Animal Name"
                }
                value={animalName}
                onChange={(e) => setAnimalName(e.target.value)}
                className="w-full px-3 py-2 border border-green rounded"
              />
              {/* rasName */}
              <div className="mb-4">
                <label className="block mb-2">Ras</label>
                <input
                  type="text"
                  id="rasName"
                  placeholder={
                    pet && pet.ras_id ? pet.ras_id.rasName + ' (optioneel)' : "Ras Name"
                  }
                  value={rasName}
                  onChange={(e) => setRasName(e.target.value)}
                  className="w-full px-3 py-2 border border-green rounded"
                />
              </div>
            </div>
            {/* productName   */}
            <div className="mb-4">
              <label className="block mb-2">Product</label>
              <input
                type="text"
                id="productName"
                placeholder={pet ? pet.productName + ' (optioneel)' : "Product Name (optioneel)"}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border border-green rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 bg-orange text-white rounded"
            >
              Gegevens Huisdier Bijwerken
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditYourPet;
