import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Dieren() {
  const [ras, setRas] = useState([]);
  const [animals, setAnimals] = useState([]);
  // zet de reqId standaard op all zodat alles wordt opgehaald wanneer het voor het eerst opend
  const [reqId, setReqId] = useState("all");
  const jwttoken = localStorage.getItem("jwtToken");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [totalPage, setTotalPage] = useState();
  const [selectedRas, setSelectedRas] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      // Haalt de rassen op met het geselecteerde filter, standaard is all
      .get(
        `http://localhost:3001/api/getRas/${reqId}?page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      )
      .then((response) => {
        setRas(response.data.data);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {});
    // haalt standaard alle rassen/animals op voor in de select box
    axios
      .get(`http://localhost:3001/api/getAnimal`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {});

    axios
      .get(`http://localhost:3001/product/all/all`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((response) => {
        setProduct(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {});
    // Houd reqId up to date in het useEffect
  }, [reqId, totalPage, page]);

  //Maakt array voor animalobjects
  const animalObjects = [];

  // kijkt door alles heen en zet alle unieke animals in de animalobj array
  animals.forEach((animal) => {
    const animalId = animal._id;
    const animalName = animal.animalName;

    animalObjects.push({ id: animalId, name: animalName });
  });

  // update het reqId onchange
  function selectedAnimal(selectedValue) {
    setReqId(selectedValue);
    // Zorgt dat de pagina terug naar 1 gaat wanneer er een filter toegepast wordt
    setPage(1);
  }

  const getPage = (event, value) => {
    setPage(value);
  };

  const handleShowRasInfo = (ras) => {
    setSelectedRas(ras);
    // Filter products for the selected breed's animal
    const filteredProducts = product.filter((p) => {
      if (p.brand_id.animal_id) {
        return p.brand_id.animal_id._id === ras.animal_id._id;
      }
    });

    setFilteredProducts(filteredProducts); // Assuming you have a state for this
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedRas(null);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="w-1/6">
        <div className="flex flex-row justify-between">
          <Link to="/adminaddDier">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="h-8 mb-2"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
            Ras toe voegen
          </Link>
          <Link to="/AddAnimal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="h-8 mb-2"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
            Dier toe voegen
          </Link>
        </div>
      </div>
      <select
        id="animals"
        onChange={(event) => selectedAnimal(event.target.value)}
        className="mb-4 bg-orange border border-orange text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option key="alles" value="all" className="text-lg">
          Alle Dieren
        </option>
        {animalObjects.map((animal) => (
          <option key={animal.id} value={animal.id} className="text-lg">
            {animal.name}
          </option>
        ))}
      </select>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-light-green">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ras
              </th>
              <th scope="col" className="px-6 py-3">
                Soort
              </th>
              <th scope="col" className="px-6 py-3">
                Voedselopties
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
            {ras.map((ras) => (
              <tr key={ras._id} className="odd:bg-green even:bg-light-green">
                <th scope="row" className="px-6 py-4">
                  {ras.rasName}
                </th>
                <td className="px-6 py-4">{ras.animal_id.animalName}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="h-8"
                    onClick={() => handleShowRasInfo(ras)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-8"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                  </button>
                  {showPopup && selectedRas && (
                    <div className="sm:ml-64 fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center">
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
                              <li key={product._id}>
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
                  <Link to={`/adminEditDier/${ras._id}`}>
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
                  <Link to={`/adminDeleteDier/${ras._id}`}>
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
      <Stack spacing={2}>
        <Pagination count={totalPage} page={page} onChange={getPage} />
      </Stack>
    </div>
  );
}

export default Dieren;
