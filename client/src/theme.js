// src/theme.js
import { createTheme } from "@mui/material/styles";

/**
 * Orange & White Premium Theme
 * - Primary: warm orange
 * - Accent: soft orange gradient
 * - Background: white + very light off-white
 * - Typography: Montserrat + fallbacks
 *
 * This theme focuses on:
 *  - consistent radii
 *  - soft shadows (elevation)
 *  - button / card motion-friendly transitions
 *  - component style overrides to keep UI consistent
 */

const PRIMARY_ORANGE = "#FF6A2A"; // main orange
const PRIMARY_ORANGE_LIGHT = "#FF8C52"; // lighter orange
const SOFT_ORANGE = "#FFB78C"; // subtle accent
const DARK_TEXT = "#1F2937";
const OFF_WHITE = "#FAFAFB";
const WHITE = "#FFFFFF";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY_ORANGE,
      light: PRIMARY_ORANGE_LIGHT,
      contrastText: WHITE,
    },
    secondary: {
      main: "#6B7280", // muted gray for secondary text / controls
    },
    background: {
      default: OFF_WHITE,
      paper: WHITE,
    },
    text: {
      primary: DARK_TEXT,
      secondary: "#6B7280",
    },
    // success, error etc. left as defaults or can be customized
  },

  typography: {
    fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.95rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  spacing: 8, // 8px base

  shape: {
    borderRadius: 12, // global border radius (rounded, modern)
  },

  // Global transitions/shadows tokens for consistent usage
  shadows: [
    "none",
    "0px 1px 3px rgba(16,24,40,0.04)",
    "0px 4px 12px rgba(16,24,40,0.06)",
    "0px 8px 24px rgba(16,24,40,0.08)",
    "0px 12px 40px rgba(16,24,40,0.12)",
  ],

  components: {
    // Global Paper defaults (cards, panels)
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundClip: "padding-box",
        },
      },
    },

    // Buttons: primary CTA styling
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 18px",
          transition: "transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms",
        },
        containedPrimary: {
          background: `linear-gradient(90deg, ${PRIMARY_ORANGE}, ${PRIMARY_ORANGE_LIGHT})`,
          color: WHITE,
          boxShadow: "0 6px 18px rgba(255,106,42,0.12)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 30px rgba(255,106,42,0.14)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0 6px 18px rgba(255,106,42,0.12)",
          },
        },
        outlinedPrimary: {
          borderColor: PRIMARY_ORANGE,
          color: PRIMARY_ORANGE,
          "&:hover": {
            backgroundColor: "rgba(255,106,42,0.04)",
            borderColor: PRIMARY_ORANGE,
            transform: "translateY(-1px)",
          },
        },
        textPrimary: {
          color: PRIMARY_ORANGE,
        },
      },
    },

    // Cards - subtle lift on hover
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms",
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 36px rgba(16,24,40,0.10)",
          },
        },
      },
    },

    // CardMedia: ensure clean image handling
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      },
    },

    // Paper for the notes panel, modal content, etc.
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },

    // Dialogs (modal) — floating with gentle shadow
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          padding: 0,
          boxShadow: "0 20px 60px rgba(16,24,40,0.12)",
        },
      },
    },

    // TextField / Input styles
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: WHITE,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_ORANGE,
            boxShadow: "0 6px 18px rgba(255,106,42,0.06)",
          },
        },
      },
    },

    // Typography default color
    MuiTypography: {
      styleOverrides: {
        root: {
          color: DARK_TEXT,
        },
      },
    },

    // Tooltip small tweaks (optional)
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
        },
      },
    },

    // List items (used in menus)
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&.Mui-selected": {
            backgroundColor: "rgba(255,106,42,0.06)",
            color: PRIMARY_ORANGE,
          },
        },
      },
    },

    // Avatar sizes for profile initials
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: PRIMARY_ORANGE,
          color: WHITE,
        },
      },
    },
  },
});

export default theme;
