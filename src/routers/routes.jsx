import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { userAuth } from "../context/AuthContext";
import Ciclo1 from "../pages/Ciclo1";

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
    </Routes>
  );
}
