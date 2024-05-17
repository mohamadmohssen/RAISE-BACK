import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getSingleProductData = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      console.log("Data from API:", data);
      setProduct(data);
    };
    getSingleProductData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
  };

  return (
    <div>
      <h1>Detail Product</h1>
      <Card className="shadow-lg m-2 p-3 rounded" style={{ width: "18rem" }}>
        <CardBody>
          <CardTitle>Title: {product.title}</CardTitle>
          <CardTitle>Price: ${product.price}</CardTitle>

          <CardText>Decription: {product.description}</CardText>
        </CardBody>
        <Link to={`/product/edit/${id}`}>
          <Button>edit</Button>
        </Link>
        <Link to={`/products`}>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
        </Link>
      </Card>
    </div>
  );
};
export default Productdetail;
