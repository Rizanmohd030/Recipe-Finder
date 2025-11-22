// src/components/NotesEditModal.jsx

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

/**
 * Premium Orange/Glass Notes Modal (Style B)
 */
const NotesEditModal = ({ open, onClose, recipe, onSave }) => {
  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    if (recipe) {
      setNotesText(recipe.notes || "");
    }
  }, [recipe]);

  if (!recipe) return null;

  const handleSave = () => {
    onSave(recipe.idMeal, notesText);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,145,0,0.25)",
          boxShadow: "0 8px 35px rgba(255,140,0,0.25)",
        },
      }}
    >
      {/* Orange Accent Header */}
      <Box
        sx={{
          p: 2.5,
          px: 3,
          bgcolor: "primary.main",
          color: "white",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Edit Notes for {recipe.strMeal}
        </Typography>
      </Box>

      {/* Content */}
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Add or update your personal notes.
        </Typography>

        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          label="Your Notes"
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            background:
              "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesEditModal;
