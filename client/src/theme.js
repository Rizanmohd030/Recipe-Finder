import { createTheme } from "@mui/material/styles";

const BLUE = "#1A1A2E";
const BLUE_DARK = "#121222";
const ORANGE = "#ff5b1f";
const ORANGE_DARK = "#d94811";
const CREAM = "#fffdf7";
const PAGE_BG = "#F5F0E8";
const WHITE = "#ffffff";
const BLACK = "#111111";
const GRAY = "#5f6673";
const BORDER = "2px solid #111111";
const SHADOW = "8px 8px 0 #111111";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: BLUE,
      dark: BLUE_DARK,
      contrastText: WHITE,
    },
    secondary: {
      main: ORANGE,
      dark: ORANGE_DARK,
      contrastText: WHITE,
    },
    background: {
      default: PAGE_BG,
      paper: WHITE,
    },
    text: {
      primary: BLACK,
      secondary: GRAY,
    },
    error: {
      main: "#d92d20",
    },
    success: {
      main: "#0f9d58",
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Trebuchet MS", "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.06em" },
    h2: { fontWeight: 700, letterSpacing: "-0.05em" },
    h3: { fontWeight: 700, letterSpacing: "-0.04em" },
    h4: { fontWeight: 700, letterSpacing: "-0.03em" },
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.95rem", lineHeight: 1.55 },
    button: {
      fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: PAGE_BG,
          backgroundImage:
            "radial-gradient(circle at top left, rgba(255,255,255,0.14) 0, rgba(255,255,255,0.14) 2px, transparent 2px)",
          backgroundSize: "22px 22px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          position: "relative",
          zIndex: 1,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: WHITE,
          border: BORDER,
          borderRadius: 0,
          boxShadow: SHADOW,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "12px 20px",
          boxShadow: "none",
          border: BORDER,
          transform: "translate(0, 0)",
          transition: "transform 160ms ease, background-color 160ms ease, color 160ms ease",
          "&:hover": {
            boxShadow: "none",
            transform: "translate(2px, 2px)",
          },
        },
        containedPrimary: {
          backgroundColor: BLUE,
          color: WHITE,
          "&:hover": {
            backgroundColor: BLUE_DARK,
          },
        },
        containedSecondary: {
          backgroundColor: ORANGE,
          color: WHITE,
          "&:hover": {
            backgroundColor: ORANGE_DARK,
          },
        },
        outlined: {
          backgroundColor: WHITE,
        },
        outlinedPrimary: {
          borderColor: BLACK,
          color: BLACK,
          "&:hover": {
            borderColor: BLACK,
            backgroundColor: "#f3efeb",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: BORDER,
          borderRadius: 0,
          boxShadow: SHADOW,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: WHITE,
          border: BORDER,
          borderRadius: 0,
          boxShadow: "12px 12px 0 #111111",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: WHITE,
          borderRadius: 0,
          "& fieldset": {
            borderColor: BLACK,
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: BLACK,
          },
          "&.Mui-focused fieldset": {
            borderColor: BLUE,
          },
        },
        input: {
          paddingTop: 14,
          paddingBottom: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          border: BORDER,
          borderRadius: 0,
          boxShadow: "6px 6px 0 #111111",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#111111",
          opacity: 0.2,
        },
      },
    },
  },
});

export default theme;
