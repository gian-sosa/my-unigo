import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { userAuth } from "../context/AuthContext";
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
      <Route path="/ciclo1" element={<Ciclo1 />} />
      <Route path="/ciclo2" element={<Ciclo2 />} />
      <Route path="/ciclo3" element={<Ciclo3 />} />
      <Route path="/ciclo4" element={<Ciclo4 />} />
      <Route path="/ciclo5" element={<Ciclo5 />} />
      <Route path="/ciclo6" element={<Ciclo6 />} />
      <Route path="/ciclo7" element={<Ciclo7 />} />
      <Route path="/ciclo8" element={<Ciclo8 />} />
      <Route path="/ciclo9" element={<Ciclo9 />} />
      <Route path="/ciclo10" element={<Ciclo10 />} />
    </Routes>
  );
}
