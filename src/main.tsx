import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./routes/Home";
import AuthorHeading from "./components/AuthorHeading";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <AuthorHeading />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
