import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await axios.get("/api/products/allProducts");
      console.log("Data from API:", data);
      setProducts(data);
    };
    getProductData();
  }, []);
  return (
    <div>
      <Container className="justify-content-center m-5 p-2">
        {" "}
        <h1 className="text-center">all products</h1>
        <hr />
        <Row>
          {products.map((product) => {
            return (
              <Col md={6} lg={4} sm={12} key={product.id}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ShowProducts;
