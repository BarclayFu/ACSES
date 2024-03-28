import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserLoggedInQuery } from "./features/auth/userAuthApi";
import { useAdminAuthChecked } from "./hooks/useAdminAuthChecked";
import { useUserAuthChecked } from "./hooks/userUserAuthChecked";
import { UserLayout } from "./layouts/UserLayout";
import { Login } from "./pages/Admin/Login";
import { NotFound } from "./pages/Admin/NotFound";
import { Home } from "./pages/User/Home/Home";
import { UserLogin } from "./pages/User/UserLogin";
import { PrivateRoute } from "./routes/admin/PrivateRoute";
import { PublicRoute } from "./routes/admin/PublicRoute";
import { UserPublicRoute } from "./routes/user/UserPublicRoute";
import { ProgramDetail } from "./pages/User/Course/ProgramDetail";
import { SessionDetail } from "./pages/User/Course/SessionDetail";
import { ContentDetail } from "./pages/User/Course/ContentDetail";
import { Profile } from "./pages/User/Profile/PersonalProfile";

function App() {
  const adminAuthChecked = useAdminAuthChecked();
  const userAuthChecked = useUserAuthChecked();

  useUserLoggedInQuery();

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
      </Route>

      <Route path="/*" element={<NotFound />} />
      <Route path="/admin/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
