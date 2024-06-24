import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function KlantDashboard() {
  const jwtToken = localStorage.getItem("jwtToken");
  const [pet, setPet] = useState([]);
  const userId = decodedToken.userId;
  const decodedToken = jwtDecode(jwtToken);
  const jwttoken = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getPets/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((response) => {
        //console.log(response);
        setPet(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  return (
    <div className="p-4 sm:ml-64 h-screen place-content-center">
      <div className="grid grid-cols-2 gap-4 mb-4 mt-48 h-20">
        <div className="h-24 rounded bg-light-green ">
          <div className="w-44">
            <Link to="/yourpets">
              <p class="text-2xl text-gray-500 ml-4">Uw Huisdieren</p>
            </Link>
          </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-center h-24 rounded bg-light-green">
          <p class="text-2xl text-gray-400 dark:text-gray-500">Nieuws</p>
        </div>
      </div>
    </div>
  );
}

export default KlantDashboard;
