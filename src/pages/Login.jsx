import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { sanitizeText, validateInstitutionalEmail } from "../utils/validation";

function Login() {
  const { signInWithGoogle, sessionError } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleEmailChange = (e) => {
    const sanitizedValue = sanitizeText(e.target.value);
    setEmail(sanitizedValue);

    // Validar email en tiempo real
    if (sanitizedValue && !validateInstitutionalEmail(sanitizedValue)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Solo se permiten emails del dominio @unsch.edu.pe",
      }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handlePasswordChange = (e) => {
    const sanitizedValue = sanitizeText(e.target.value);
    setPassword(sanitizedValue);

    // Validación básica de contraseña
    if (sanitizedValue && sanitizedValue.length < 6) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "La contraseña debe tener al menos 6 caracteres",
      }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  const handleGoogleLogin = async () => {
    setShowWarning(true);
    // Pequeño delay para que el usuario lea la advertencia
    setTimeout(() => {
      signInWithGoogle();
    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm flex flex-col items-center p-6 md:p-10 gap-6 rounded-2xl w-full shadow-2xl border border-white/20">
          {/* Advertencia de dominio de email */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 text-sm">
                  Correo Institucional UNSCH Requerido
                </h4>
                <p className="text-blue-700 text-xs mt-1">
                  Debido a las Políticas de privacidad e integridad de material
                  universitario, solo se permite el acceso con Correo
                  Institucional de dominio <strong>@unsch.edu.pe</strong>{" "}
                  mediante Google.
                </p>
              </div>
            </div>
          </div>

          {/* Error de sesión si existe */}
          {sessionError && (
            <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4 mb-2">
              <div className="flex items-start gap-3">
                <div className="text-red-600 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 text-sm">
                    Error de Autenticación
                  </h4>
                  <p className="text-red-700 text-xs mt-1">{sessionError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl md:text-3xl text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniGo
            </h1>
            <p className="font-semibold text-slate-700 text-base">
              ¡Hola de nuevo!
            </p>
            <p className="text-slate-600 text-sm">
              Por favor, ingresa tus datos.
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-slate-700">
                Correo
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-4 bg-slate-50 border ${
                  validationErrors.email ? "border-red-500" : "border-slate-200"
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 transition-all duration-200`}
                placeholder="ejemplo@unsch.edu.pe"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-4 bg-slate-50 border ${
                  validationErrors.password
                    ? "border-red-500"
                    : "border-slate-200"
                } rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 transition-all duration-200`}
                placeholder="Ingresa tu contraseña"
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                id="recuerdame"
                className="w-4 h-4 text-blue-600 bg-slate-50 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="recuerdame" className="text-slate-600 text-sm">
                Recordar mis datos
              </label>
            </div>
            <div className="flex justify-center">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold p-4 rounded-xl transition-all duration-200  shadow-lg cursor-not-allowed">
                Iniciar Sesión
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold p-4 rounded-xl transition-all duration-200  shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar con Google
              </button>
            </div>
            <p className="text-center text-sm text-slate-600">
              ¿No tienes una cuenta?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
