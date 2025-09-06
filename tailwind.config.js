module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Habilitar modo oscuro basado en clase
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
