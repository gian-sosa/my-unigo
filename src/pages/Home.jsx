import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import Header from "../components/Header";

function Home() {
  const { user, loading } = userAuth();
  const navigate = useNavigate();

  if (loading) {
    // Mostrar loader mientras se resuelve la autenticación
    return (
      <div className="absolute inset-0 h-full w-full bg-[#393E46] flex items-center justify-center">
        <div className="text-[#DFD0B8] text-xl">Cargando...</div>
      </div>
    );
  }

  if (user === null) {
    // Loader o nada mientras se resuelve la autenticación
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex flex-col">
      <Header />
      {/* Ciclos Grid */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={() => navigate("/ciclo1")}
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium cursor-pointer"
            >
              Ciclo 1
            </button>
            <button
              onClick={() => navigate("/ciclo2")}
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium cursor-pointer"
            >
              Ciclo 2
            </button>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 3
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 4
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 5
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 6
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 7
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 8
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 9
            </a>
            <a
              href="#"
              className="bg-[#222831] text-[#DFD0B8] text-center p-4 md:p-6 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
            >
              Ciclo 10
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
