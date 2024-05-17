import React from "react";
import { Card, CardBody, CardText, CardTitle, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="shadow-lg m-2 p-3 rounded" style={{ width: "18rem" }}>
      <CardBody>
        <CardTitle>Title: {product.title}</CardTitle>
        <CardTitle>Price: ${product.price}</CardTitle>

        <CardText>Decription: {product.description}</CardText>
      </CardBody>
      <Link to={`/product/${product.id}`}>
        <Button>detail</Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
