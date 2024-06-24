import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const jwttoken = localStorage.getItem("jwtToken");

function ProductDashboard() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [totalPage, setTotalPage] = useState();
  const [brandId, setBrandId] = useState("all");
  const [variantId, setVariantId] = useState("all");
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/product/${brandId}/${variantId}?page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
            // Other headers if needed
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setTotalPage(res.data.totalPages);
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:3001/api/getMerk/all`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3001/api/getVariant`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setVariants(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [brandId, variantId, page, totalPage]);

  const brandObjects = [];

  brands.forEach((brand) => {
    const brandId = brand._id;
    const brandName = brand.brandName;

    brandObjects.push({ id: brandId, name: brandName });
  });

  function selectedBrand(selectedValue) {
    setBrandId(selectedValue);
    setPage(1);
  }

  const variantObjects = [];

  variants.forEach((variant) => {
    const variantId = variant._id;
    const variantName = variant.variantName;

    variantObjects.push({ id: variantId, name: variantName });
  });

  function selectedVariant(selectedValue) {
    setVariantId(selectedValue);
    setPage(1);
  }

  const getPage = (event, value) => {
    setPage(value);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="w-1">
        <Link to="/adminAddProduct">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="h-8 mb-2"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </Link>
      </div>
      <select
        id="brands"
        onChange={(event) => selectedBrand(event.target.value)}
        className="mb-4 bg-orange border border-orange text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option key="alles" value="all" className="text-lg">
          Alle Merken
        </option>
        {brandObjects.map((brand) => (
          <option key={brand.id} value={brand.id} className="text-lg">
            {brand.name}
          </option>
        ))}
      </select>
      <select
        id="variants"
        onChange={(event) => selectedVariant(event.target.value)}
        className="mb-4 bg-orange border border-orange text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option key="alles" value="all" className="text-lg">
          Alle Varianten
        </option>
        {variantObjects.map((variant) => (
          <option key={variant.id} value={variant.id} className="text-lg">
            {variant.name}
          </option>
        ))}
      </select>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-light-green">
            <tr>
              <th scope="col" className="px-6 py-3">
                Merk
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Variant
              </th>
              <th scope="col" className="px-6 py-3">
                Geschikte huisdier
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
            {product.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-green even:bg-light-green"
              >
                <td className="px-6 py-4">
                  {product.brand_id ? product.brand_id.brandName : "-"}
                </td>
                <td className="px-6 py-4">{product.productName}</td>
                <td className="px-6 py-4">{product.variant_id.variantName}</td>
                <td className="px-6 py-4">
                  {product.brand_id.animal_id
                    ? product.brand_id.animal_id.animalName
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <Link to={`/adminEditProduct/${product._id}`}>
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
                  <Link to={`/adminDeleteProduct/${product._id}`}>
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

export default ProductDashboard;
