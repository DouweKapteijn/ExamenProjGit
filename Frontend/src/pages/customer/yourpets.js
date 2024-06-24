import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

function YourPets() {
  const jwtToken = localStorage.getItem("jwtToken");
  const [pet, setPet] = useState([]);
  const decodedToken = jwtDecode(jwtToken);
  const userId = decodedToken.userId; // Make sure your JWT contains the userId
  const [selectedType, setSelectedType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getPets/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });

    axios
      .get(`http://localhost:3001/product/all/all`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  const handleShowRasInfo = (type) => {
    setSelectedType(type);
    const filteredProducts = product.filter((p) => {
      if (p.brand_id.animal_id) {
        return p.brand_id.animal_id._id === type._id;
      }
    });
    setFilteredProducts(filteredProducts);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedType(null);
  };

  return (
    <div className="p-4 sm:ml-64">
      <Link to="/addyourpet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-8 mb-2"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          
        </svg>    
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-light-green">
            <tr>
              <th scope="col" className="px-6 py-3">
                Naam
              </th>
              <th scope="col" className="px-6 py-3">
                Soort
              </th>
              <th scope="col" className="px-6 py-3">
                Ras
              </th>
              <th scope="col" className="px-6 py-3">
                Geboortedatum
              </th>
              <th scope="col" className="px-6 py-3">
                Voeropties
              </th>
              <th scope="col" className="px-6 py-3">
                Bewerk
              </th>
              <th scope="col" className="px-6 py-3">
                Verwijder
              </th>
            </tr>
          </thead>

          <tbody>
            {pet.map((pet) => (
              <tr key={pet._id} className="odd:bg-green even:bg-light-green">
                <th scope="row" className="px-6 py-4">
                  {pet.petName}
                </th>
                <td className="px-6 py-4">
                  {pet.animal_id ? pet.animal_id.animalName : "-"}
                </td>
                <td className="px-6 py-4">
                  {pet.ras_id ? pet.ras_id.rasName : "-"}
                </td>
                <td className="px-6 py-4">
                  {dayjs(pet.birthDate).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="h-8"
                    onClick={() => handleShowRasInfo(pet.animal_id)} // Pass pet's ras_id
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-8"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                  </button>
                  {showPopup && selectedType && (
                    <div className="sm:ml-64 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-5 rounded-lg w-3/5 relative">
                        <button
                          className="absolute top-0 right-0 mt-2 mr-2"
                          onClick={handleClosePopup}
                        >
                          &#x2715;
                        </button>
                        <h4>Voedselopties:</h4>
                        <ul>
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                              <li key={product.brand_id.animal_id._id}>
                                {product.productName} -{" "}
                                {product.variant_id.variantName}
                              </li>
                            ))
                          ) : (
                            <li>Geen product gevonden</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/edityourpets/${pet._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-8"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/deleteyourpet/${pet._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 500 500"
                      className="h-8"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YourPets;
