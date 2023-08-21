/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "-apple-system", "system-ui", "sans-serif"],
        pretendard: ["Pretendard", "-apple-system", "system-ui", "sans-serif"],
        nunito: ["Nunito Sans", "-apple-system", "system-ui", "sans-serif"],
        mulish: ["Mulish", "-apple-system", "system-ui", "sans-serif"],
        quicksand: ["Quicksand", "-apple-system", "system-ui", "sans-serif"],
        syncopate: ["Syncopate", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        gray: {
          900: "#1C1C1C",
          800: "#2a2a2a",
          700: "#3f3f3f",
          600: "#757575",
          500: "#999999",
          400: "#BBBBBB",
          300: "#DDDDDD",
          200: "#EDEDED",
          100: "#F4F4F4",
        },
        primary: {
          900: "#003F89",
          800: "#0051AF",
          700: "#006FD6",
          600: "#0093E5",
          500: "#00B5EE",
          400: "#00D7F4",
          300: "#00ECFF",
          200: "#80F6FF",
          100: "#BFFAFF",
        },
        success: "#06D270",
        error: "#FA7884",
        "neon-lemon": "#FBFF48",
        "neon-lime": "#D6EF38",
        discord: "#5865F2",
      },
      fontSize: {
        "h1-syncopate": [
          "76px",
          {
            fontSize: "76px",
            fontWeight: "bold",
            letterSpacing: "-1.5px",
            lineHeight: "88px",
          },
        ],
        "h2-syncopate": [
          "48px",
          {
            fontSize: "48px",
            fontWeight: "bold",
            letterSpacing: "-0.5px",
            lineHeight: "56px",
          },
        ],
        "h3-syncopate": [
          "38px",
          {
            fontSize: "38px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "56px",
          },
        ],
        "h4-syncopate": [
          "28px",
          {
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "34px",
          },
        ],
        "h5-syncopate": [
          "20px",
          {
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "24px",
          },
        ],
        "h6-syncopate": [
          "18px",
          {
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "22px",
          },
        ],
        "h1-poppins": [
          "28px",
          {
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "36px",
          },
        ],
        "h2-poppins": [
          "24px",
          {
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "32px",
          },
        ],
        "h3-poppins": [
          "20px",
          {
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "28px",
          },
        ],
        "h4-poppins": [
          "18px",
          {
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0px",
            lineHeight: "26px",
          },
        ],
        subtitle: [
          "16px",
          {
            fontSize: "16px",
            lineHeight: "22px",
          },
        ],
        body1: [
          "15px",
          {
            fontSize: "15px",
            lineHeight: "22px",
          },
        ],
        body2: [
          "14px",
          {
            fontSize: "14px",
            lineHeight: "20px",
          },
        ],
        body3: [
          "13px",
          {
            fontSize: "13px",
            lineHeight: "18px",
          },
        ],
        btn1: [
          "20px",
          {
            fontSize: "20px",
            letterSpacing: "0.0125em",
            lineHeight: "28px",
            textTransform: "uppercase",
          },
        ],
        btn2: [
          "18px",
          {
            fontSize: "18px",
            letterSpacing: "0.0125em",
            lineHeight: "26px",
            textTransform: "uppercase",
          },
        ],
        btn3: [
          "16px",
          {
            fontSize: "16px",
            letterSpacing: "0.0125em",
            lineHeight: "22px",
            textTransform: "uppercase",
          },
        ],
        btn4: [
          "14px",
          {
            fontSize: "14px",
            letterSpacing: "0.0125em",
            lineHeight: "20px",
            textTransform: "uppercase",
          },
        ],
        caption: [
          "12px",
          {
            fontSize: "12px",
            lineHeight: "18px",
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
