import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { userAuth } from "../context/AuthContext";
import Ciclo1 from "../pages/Ciclo1";
import Ciclo2 from "../pages/Ciclo2";

function HomeOrLogin() {
  const { user, loading } = userAuth();
  if (loading) return null;
  return user ? <Home /> : <Login />;
}

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeOrLogin />} />
      <Route path="/ciclo1" element={<Ciclo1 />} />
      <Route path="/ciclo2" element={<Ciclo2 />} />
    </Routes>
  );
}
