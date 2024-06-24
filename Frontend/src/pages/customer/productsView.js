import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const jwttoken = localStorage.getItem("jwtToken");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
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
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data.data);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        //console.log(error);
      });
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
        //console.log(error);
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
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Merk
              </th>
              <th scope="col" className="px-6 py-3">
                Variant
              </th>
              <th scope="col" className="px-6 py-3">
                Diersoort
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-green even:bg-light-green"
              >
                <th scope="row" className="px-6 py-4">
                  {product.productName}
                </th>
                <td className="px-6 py-4">
                  {product.brand_id ? product.brand_id.brandName : "-"}
                </td>
                <td className="px-6 py-4">
                  {product.variant_id ? product.variant_id.variantName : "-"}
                </td>
                <td className="px-6 py-4">
                  {product.brand_id.animal_id
                    ? product.brand_id.animal_id.animalName
                    : "-"}
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

export default Products;
