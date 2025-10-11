module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Habilitar modo oscuro basado en clase
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        base: "0.875rem", // Reducir de 1rem (16px) a 0.875rem (14px)
      },
    },
  },
  plugins: [],
};
