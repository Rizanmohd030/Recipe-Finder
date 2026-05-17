import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          px: 3,
          py: 2.25,
          borderBottom: "2px solid #111111",
          bgcolor: "primary.main",
          color: "#ffffff",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Edit Notes
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.88)", mt: 0.5 }}>
          {recipe.strMeal}
        </Typography>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={5}
          label="Your Notes"
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesEditModal;
