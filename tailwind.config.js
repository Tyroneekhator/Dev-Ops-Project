module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#1C64F2",
        "light-gray": "#E5E7EB",
        "very-light-gray": "#F9FAFB",
      },
      transitionDuration: {
        5000: "5000ms",
      },
    },
  },
  plugins: [],
};
