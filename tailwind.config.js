/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            instrument: ["Instrument Sans", "sans-serif"],
            outfit: ["Outfit", "sans-serif"],
            clash: ["Clash Display", "sans-serif"],
            tiempos: ["Test Tiempos Fine", "sans-serif"],
        },  
      extend: {
        colors:{
            neutral100: "#FAFAFA",
            neutral200: "#EEEEEE",
            neutral300: "#E1E1E1",
            neutral500: "#8E8E8E",
            neutral600: "#4B4B4B",
            purple100:"#E0D8FF",
            purple200:"#EDE9FF",
            purple300:"#F9F8FF",
            purple400:"#714EFF",
            purple500:"#7B43EA",
            purple600:"#E6E0FF",
            blue100:"#F1F8FF",
            blue200:"#CEF0FF",
            blue300:"#3EDFFB",
            blue400:"#0BA5EC",
            blue500:"#DAFAFF",
            orange100:"#FFF3E8",
            orange200:"#FFD9B4",
            orange300:"#FE9B0E",
            orange400:"#FF8C1A",
            brown100:"#573312",

        },
        boxShadow:{
            deliveryShadow: "2px 4px 44.7px 0px #E0D8FFB2",
            scheduleShadow: "0px 1px 20.9px 0px #714EFF1A",
        },
        backgroundImage: {
            line: "url(../public/line.png)",
            about: "url(../public/about-bg.png)"
        }
      },
    },
    plugins: [],
  }