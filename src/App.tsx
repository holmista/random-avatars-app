import React, { Suspense, lazy, useEffect } from "react";
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
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import { setAuth } from "./stores/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./stores/store";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <UploadImagesView />,
//   },
//   {
//     path: "/login",
//     element: <LoginView />,
//   },
//   {
//     path: "/admin/unapproved-resources",
//     element: (
//       <PrivateRoute>
//         {/* <AdminUnapprovedResources /> */}
//         <div>hjhjhk</div>
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "/admin/unapproved-resources/:resource",
//     element: (
//       <PrivateRoute>
//         <AdminUnapprovedResource />
//       </PrivateRoute>
//     ),
//   },
// ]);

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const fetchAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/auth/me`, {
        withCredentials: true,
      });
      if (res.data && res.data.message === "authorized") {
        dispatch(setAuth(true));
      }
    } catch (err) {
      dispatch(setAuth(false));
    }
  };

  useEffect(() => {
    if (isAuthenticated == null) {
      fetchAuth();
    }
  }, [isAuthenticated]);
  if (isAuthenticated == null) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-gradient-to-br from-[#141625] to-[#252945] min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          {/* <RouterProvider router={router} /> */}
          <Router>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/admin/unapproved-resources"
                  element={<AdminUnapprovedResources />}
                />
                <Route
                  path="/admin/unapproved-resources/:resource"
                  element={<AdminUnapprovedResource />}
                />
              </Route>
              <Route path="/" element={<UploadImagesView />} />
              <Route path="/login" element={<LoginView />} />
            </Routes>
          </Router>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
