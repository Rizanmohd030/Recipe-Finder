import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";

const stats = [
  {
    icon: <RestaurantMenuOutlinedIcon sx={{ color: "#1A1A2E", fontSize: 30 }} />,
    value: "50K+",
    label: "recipes available",
  },
  {
    icon: <FactCheckOutlinedIcon sx={{ color: "#1A1A2E", fontSize: 30 }} />,
    value: "98.2%",
    label: "scan accuracy",
  },
  {
    icon: <KitchenOutlinedIcon sx={{ color: "#1A1A2E", fontSize: 30 }} />,
    value: "2.4M",
    label: "dishes scanned",
  },
];

const HomeStatsBanner = () => {
  return (
    <Paper sx={{ mt: 4, bgcolor: "#fffdf7" }}>
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
              py: 2.75,
              textAlign: "center",
              borderRight: { md: index < stats.length - 1 ? "2px solid #111111" : "none" },
              borderBottom: { xs: index < stats.length - 1 ? "2px solid #111111" : "none", md: "none" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>{stat.icon}</Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {stat.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.75,
                display: "block",
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
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
