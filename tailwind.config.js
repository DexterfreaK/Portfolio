/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        MonumentGroteskBold: ["Monument Grotesk Bold", "system-ui"],
        MonumentGroteskBoldItalic: [
          "Monument Grotesk Bold Italic",
          "system-ui",
        ],
        MonumentGroteskItalic: ["Monument Grotesk Italic", "system-ui"],
        MonumentGroteskMedium: ["Monument Grotesk Medium", "system-ui"],
        MonumentGroteskMediumItalic: [
          "Monument Grotesk Medium Italic",
          "system-ui",
        ],
        MonumentGroteskMono: ["Monument Grotesk Mono", "system-ui"],
        MonumentGroteskRegular: ["Monument Grotesk Regular", "system-ui"],
        MonumentGroteskSemiMono: ["Monument Grotesk Semi Mono", "system-ui"],
      },
    },
  },
  plugins: [],
};
