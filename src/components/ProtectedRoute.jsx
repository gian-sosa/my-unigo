import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

// Componente para proteger rutas que requieren autenticación
function ProtectedRoute({ children }) {
  const { user, loading, sessionError } = userAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar error de sesión si existe
  if (sessionError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-red-400 text-xl mb-2">⚠️</div>
          <p className="text-white text-lg mb-4">{sessionError}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return children;
}

export default ProtectedRoute;
