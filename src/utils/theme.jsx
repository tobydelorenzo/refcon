import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "Barlow, sans-serif",
        bg: "white",
        color: "#313539",
        h: "full",
      },
      "#root": {
        alignItems: "center",
        display: "flex"
      }
    }
  },

  breakpoints: createBreakpoints({
    xs: "20em", //320
    sm: "48em", //768
    md: "64em", //1024
    lg: "75em", //1200
    xl: "100em", //1600
    xxl: "120em" //1920
  }),
  colors: {
    base: {
      50: "#eceff1",
      100: "#cfd8dc",
      200: "#b0bec5",
      300: "#90a4ae",
      400: "#78909c",
      500: "#607d8b",
      600: "#546e7a",
      700: "#455a64",
      800: "#37474f",
      900: "#263238",
      d100: "#171F23",
      d200: "#12181B",
      d400: "#0D1214",
      d700: "#080C0D"
    }
  },
 
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "inherit",
        fontWeight: "normal",
        color: "inherit",
      }
    },
    Text: {
      baseStyle: {
        fontFamily: "inherit",
        fontWeight: "normal",
        lineHeight: "tall",
        color: "inherit"
      }
    },
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        letterSpacing: "widest",
        fontWeight: "normal",
        userSelect: "none"
      }
    }
  }
});

export default theme;
