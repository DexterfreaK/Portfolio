import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./routes/Home";
import Work from './routes/Work';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:'/work',
    element: <Work/>
  }
  // {
  //   path: "/test",
  //   element: <Navbar />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
