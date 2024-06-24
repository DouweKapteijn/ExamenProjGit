import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("jwtToken");
  const isLoggedOut = !localStorage.getItem("jwtToken");

  return (
    <div className="p-4 sm:ml-64 m-4">
      <div className="p-4 rounded-lg">
        {isLoggedOut ? (
          <div className="flex flex-col items-center justify-center  rounded bg-light-green">
            <p className="m-4 text-2xl text-gray-500">Welkom!</p>
            <p className="m-4 text-2xl text-center text-gray-500">
              Dit is de landings pagina.
              <br />
              Klik op de knop hieronder om in te loggen.
            </p>
              <Link to="/login" className="px-4 py-2 mb-4 font-bold border-black border-2 text-white bg-light-green rounded hover:bg-orange">
                Login
              </Link>
          </div>
        ) : null}
        {isLoggedIn ? (
          <div className="flex flex-col items-center justify-center  rounded bg-light-green">
            <p className="m-4 text-2xl text-gray-500">Welkom bij PawHaven!</p>
            <p className="m-4 text-2xl text-center text-gray-500">
              Dit is de landings pagina.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
