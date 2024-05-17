import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const addProductHandler = async () => {
    const data = {
      title: title,
      price: price,
      description: description,
      published: true,
    };
    await axios.post("/api/products/addProduct", data);
  };
  return (
    <Container>
      <div>
        <h1>add product</h1>
        <hr />
      </div>
      <Form onSubmit={addProductHandler}>
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
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
