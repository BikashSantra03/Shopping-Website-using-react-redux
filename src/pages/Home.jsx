import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
//import { productData } from "../data";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  //setProducts(productData);

  const API_URL = "https://fakestoreapi.com/products";

  async function fetchProductData() {
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(`Error occureed from API call ${error}`);
      setProducts([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div
          className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
        gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]"
        >
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="font-bold">No Data Found!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
