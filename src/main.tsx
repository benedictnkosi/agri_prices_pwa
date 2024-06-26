import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProductList } from "./components/ProductList/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList></ProductList>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
