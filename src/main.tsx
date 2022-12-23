import React from "react";
import ReactDOM from "react-dom/client";
import UploadImagesView from "./views/UploadImagesView";
import LoginView from "./views/LoginView";
import AdminUnapprovedResources from "./views/AdminUnapprovedRecources";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadImagesView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/admin/unapproved-resources",
    element: <AdminUnapprovedResources />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="bg-gradient-to-br from-[#141625] to-[#252945] min-h-screen">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </div>
);
