import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        let { data } = await axios.get(`/api/products/${id}`);
        console.log("Data from API:", data);
        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getProductData();
  }, [id]);

  const editProductHandler = async () => {
    const data = {
      title: title,
      price: price,
      description: description,
      published: true,
    };
    await axios.put(`/api/products/${id}`, data);
  };

  return (
    <Container>
      <div>
        <h1>edit product</h1>
        <hr />
      </div>
      <Form onSubmit={editProductHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price $</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Edit Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
