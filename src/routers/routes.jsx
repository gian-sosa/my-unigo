import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { userAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Ciclo1 from "../pages/Ciclo1";
import Ciclo2 from "../pages/Ciclo2";
import Ciclo3 from "../pages/Ciclo3";
import Ciclo4 from "../pages/Ciclo4";
import Ciclo5 from "../pages/Ciclo5";
import Ciclo6 from "../pages/Ciclo6";
import Ciclo7 from "../pages/Ciclo7";
import Ciclo8 from "../pages/Ciclo8";
import Ciclo9 from "../pages/Ciclo9";
import Ciclo10 from "../pages/Ciclo10";

function HomeOrLogin() {
  const { user, loading } = userAuth();
  if (loading) return null;
  return user ? <Home /> : <Login />;
}

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeOrLogin />} />
      <Route
        path="/ciclo1"
        element={
          <ProtectedRoute>
            <Ciclo1 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo2"
        element={
          <ProtectedRoute>
            <Ciclo2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo3"
        element={
          <ProtectedRoute>
            <Ciclo3 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo4"
        element={
          <ProtectedRoute>
            <Ciclo4 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo5"
        element={
          <ProtectedRoute>
            <Ciclo5 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo6"
        element={
          <ProtectedRoute>
            <Ciclo6 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo7"
        element={
          <ProtectedRoute>
            <Ciclo7 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo8"
        element={
          <ProtectedRoute>
            <Ciclo8 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo9"
        element={
          <ProtectedRoute>
            <Ciclo9 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ciclo10"
        element={
          <ProtectedRoute>
            <Ciclo10 />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
