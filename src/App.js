import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProductByCategory } from "./components/user/ProductByCategory";
import { useUserLoggedInQuery } from "./features/auth/userAuthApi";
import { useAdminAuthChecked } from "./hooks/useAdminAuthChecked";
import { useUserAuthChecked } from "./hooks/userUserAuthChecked";
// import { AdminLayout } from "./layouts/AdminLayout";
import { UserLayout } from "./layouts/UserLayout";
import { AddBrand } from "./pages/Admin/Brand/AddBrand";
import { AllBrands } from "./pages/Admin/Brand/AllBrands";
import { AddCategory } from "./pages/Admin/Category/AddCategory";
import { AllCategories } from "./pages/Admin/Category/AllCategories";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Login } from "./pages/Admin/Login";
import { NotFound } from "./pages/Admin/NotFound";
import { AllOrder } from "./pages/Admin/Order/AllOrder";
import { Home } from "./pages/User/Home/Home";
import { Order } from "./pages/User/Order/Order";
import { MyOrder } from "./pages/User/Profile/MyOrder/MyOrder";
import { Search } from "./pages/User/Search/Search";
import { UserLogin } from "./pages/User/UserLogin";
import { PrivateRoute } from "./routes/admin/PrivateRoute";
import { PublicRoute } from "./routes/admin/PublicRoute";
import { UserPrivateRoute } from "./routes/user/UserPrivateRoute";
import { UserPublicRoute } from "./routes/user/UserPublicRoute";
import { Program } from "./pages/User/Course/Program";
import { ProgramDetail } from "./pages/User/Course/ProgramDetail";
import { SessionDetail } from "./pages/User/Course/SessionDetail";
import { ContentDetail } from "./pages/User/Course/ContentDetail";
import { Profile } from "./pages/User/Profile/PersonalProfile";

function App() {
  const adminAuthChecked = useAdminAuthChecked();
  const userAuthChecked = useUserAuthChecked();

  useUserLoggedInQuery();

  // if (!userAuthChecked) {
  //   return <p className="relative top-1/2 left-1/2">Loading...</p>;
  // }
  if (!adminAuthChecked) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* user routes */}
      <Route path="/" element={<UserLayout />}>
        {/* login and routes */}
        <Route
          path="/register"
          element={
            <UserPublicRoute>
            </UserPublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <UserPublicRoute>
              <UserLogin />
            </UserPublicRoute>
          }
        />
        //Personal Profile Route
        <Route path="/profile" element={<Profile />} />

        // Programs Routes 
        <Route path="/programs/:programId" element={<ProgramDetail />} />
        <Route path="/programs/:programId/sessions/:sessionId/" element={<SessionDetail />} />
        <Route path="/content/:contentId" element={<ContentDetail />} />

        <Route path="/" element={ userAuthChecked ? <Home /> : <Navigate to="/login" />}  />
        <Route path="/home" element={  <Home />  }  />
        <Route path="/search" element={<Search />} />

        {/* user private routes */}
        <Route
          path="/order"
          element={
            <UserPrivateRoute>
              <Order />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/my-order"
          element={
            <UserPrivateRoute>
              <MyOrder />
            </UserPrivateRoute>
          }
        />
      </Route>

      {/* admin routes */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-brands"
          element={
            <PrivateRoute>
              <AllBrands />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-brand"
          element={
            <PrivateRoute>
              <AddBrand />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-categories"
          element={
            <PrivateRoute>
              <AllCategories />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-products"
          element={
            <PrivateRoute>
              <AllProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <AllOrder />
            </PrivateRoute>
          }
        />
      </Route> */}
      <Route path="/*" element={<NotFound />} />
      <Route path="/admin/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
