import React, { useState, useEffect } from "react";
import axios from "axios";
const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await axios.get("api/products/allProducts");
      console.log("Data from API:", data);
      setProducts(data);
    };
    getProductData();
  }, []);
  return (
    <div>
      <h1>all products</h1>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </div>
  );
};

export default ShowProducts;
