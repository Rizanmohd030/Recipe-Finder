import React from "react";
import { Alert, AlertTitle, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ErrorComponent = ({
  message = "An unexpected error occurred. Please try again later.",
}) => {
  return (
    <Alert
      severity="error"
      icon={<ReportProblemIcon fontSize="inherit" />}
      sx={{
        mx: "auto",
        maxWidth: 720,
        bgcolor: "#fff3f1",
      }}
    >
      <AlertTitle sx={{ fontWeight: 700 }}>Error</AlertTitle>
      <Typography variant="body1">{message}</Typography>
    </Alert>
  );
};

export default ErrorComponent;
