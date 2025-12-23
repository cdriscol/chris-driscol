export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#222",
        "ink-soft": "#444",
        muted: "#777",
        cream: "#fff",
        sand: "#f7f7f7",
        accent: "#fed136",
        "accent-strong": "#fec503",
        deep: "#222",
        glass: "rgba(34, 34, 34, 0.92)",
      },
      borderRadius: {
        lg: "3px",
        md: "3px",
      },
      boxShadow: {
        soft: "none",
        strong: "none",
      },
      fontFamily: {
        heading: ["Montserrat", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        sans: ["Open Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};
