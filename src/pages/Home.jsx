import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Home() {
  const { user, signout, loading } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignout = async () => {
    await signout();
    navigate("/login", { replace: true });
  };

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
    <div className="absolute inset-0 h-full w-full bg-[#393E46]">
      <div className="h-28 w-full bg-[#222831] flex justify-center text-[#DFD0B8]">
        <div className="h-28 w-[1320px] flex items-center justify-between">
          <h1 className="text-4xl">UniGo</h1>
          <div className="flex items-center gap-5">
            <h2>{user?.name}</h2>
            <img
              src={user?.picture}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full"
            />
            <p className="hidden">{user?.email}</p>
            <div className="card">
              <button
                onClick={handleSignout}
                className="cursor-pointer hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
