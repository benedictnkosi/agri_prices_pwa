import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import Layout from "./layout";
import { Markets } from "./components/Markets";
import { CommodityTypeList } from "./components/CommodityTypeList";
import { CommodityList } from "./components/CommodityList";
import { CommodityPrices } from "./components/CommodityPrices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Markets/>,
  },
  {
    path: "/types",
    element: <CommodityTypeList/>,
  },
  {
    path: "/commodities/:type",
    element: <CommodityList/>,
  },
  {
    path: "/prices/:commodity", // Add the new route
    element: <CommodityPrices />, // Use the new component
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
