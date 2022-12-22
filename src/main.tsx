import React from "react";
import ReactDOM from "react-dom/client";
import UploadImagesView from "./views/UploadImagesView";
import LoginView from "./views/LoginView";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadImagesView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="bg-gradient-to-br from-[#141625] to-[#252945] min-h-screen">
    <RouterProvider router={router} />
  </div>
);
