import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import UploadImagesView from "./views/UploadImagesView";
const LoginView = lazy(() => import("./views/LoginView"));
const AdminUnapprovedResources = lazy(
  () => import("./views/AdminUnapprovedRecources")
);
const AdminUnapprovedResource = lazy(
  () => import("./views/AdminUnapprovedResource")
);
import LoadingSpinner from "./components/common/LoadingSpinner";
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
  {
    path: "/admin/unapproved-resources/:resource",
    element: <AdminUnapprovedResource />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="bg-gradient-to-br from-[#141625] to-[#252945] min-h-screen">
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </div>
);
