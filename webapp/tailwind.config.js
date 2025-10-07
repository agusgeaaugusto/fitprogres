export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { blue: "#0B63B6", orange: "#FF7A00", blueDark:"#06457E", orangeDark:"#CC6100" }
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.08)" },
      borderRadius: { xl2: "1rem" }
    }
  },
  plugins: []
}
