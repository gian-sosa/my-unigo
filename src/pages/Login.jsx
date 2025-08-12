import { userAuth } from "../context/AuthContext";

function Login() {
  const { signInWithGoogle } = userAuth();

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-[#DFD0B8] text-3xl md:text-4xl text-center mb-8">
          UniGo
        </h1>
        <div className="bg-[#DFD0B8] flex flex-col items-center p-6 md:p-10 gap-5 rounded-md w-full">
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium">¡Hola de nuevo!</p>
            <p className="text-[#222831]">Por favor, ingresa tus datos.</p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Correo
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full p-3 bg-[#222831] rounded-md text-[#DFD0B8] focus:outline-none placeholder:text-[#817d74]"
                placeholder="Ingresa tu Correo"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-3 bg-[#222831] rounded-md text-[#DFD0B8] focus:outline-none placeholder:text-[#817d74]"
                placeholder="Ingresa tu Contraseña"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="recuerdame"
                className="accent-[#DFD0B8] p-5"
              />
              <label htmlFor="recuerdame" className="text-[#222831]">
                Recordar mis datos
              </label>
            </div>
            <div className="flex justify-center">
              <a href="#" className="text-[#222831] underline font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-[#222831] text-[#DFD0B8] p-3 rounded-md hover:bg-[#393E46] transition-colors duration-200 cursor-pointer">
                Iniciar Sesión
              </button>
              <button
                onClick={signInWithGoogle}
                className="bg-[#222831] text-[#DFD0B8] p-3 rounded-md hover:bg-[#393E46] transition-colors duration-200 cursor-pointer"
              >
                Iniciar con Google
              </button>
            </div>
            <p className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="underline font-medium">
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
