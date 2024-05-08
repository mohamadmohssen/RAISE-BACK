import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AddProduct from "./screens/AddProduct";
import ShowProducts from "./screens/ShowProducts";
import EditProduct from "./screens/EditProduct";
import Productdetail from "./screens/Productdetail";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/addProduct" element={<AddProduct />}></Route>
          <Route exact path="/products" element={<ShowProducts />}></Route>
          <Route
            exact
            path="/product/edit/:id"
            element={<EditProduct />}
          ></Route>
          <Route exact path="/product/:id" element={<Productdetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
