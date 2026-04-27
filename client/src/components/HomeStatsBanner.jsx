import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";

const stats = [
  {
    icon: <RestaurantMenuOutlinedIcon sx={{ color: "white" }} />,
    value: "50K+",
    label: "recipes available",
  },
  {
    icon: <FactCheckOutlinedIcon sx={{ color: "white" }} />,
    value: "98.2%",
    label: "scan accuracy",
  },
  {
    icon: <KitchenOutlinedIcon sx={{ color: "white" }} />,
    value: "2.4M",
    label: "dishes scanned",
  },
];

const HomeStatsBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(90deg, #ff6a00 0%, #ff5a00 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={stat.label}
            sx={{
              px: 3,
              py: 2.6,
              textAlign: "center",
              borderRight: {
                xs: "none",
                md: index < stats.length - 1 ? "1px solid rgba(255,255,255,0.22)" : "none",
              },
              borderBottom: {
                xs: index < stats.length - 1 ? "1px solid rgba(255,255,255,0.22)" : "none",
                md: "none",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              {stat.icon}
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {stat.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default HomeStatsBanner;
