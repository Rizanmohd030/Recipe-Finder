
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';

/**
 * A modal dialog for editing the notes of a favorite recipe.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.open - Controls if the modal is open or closed.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {object} props.recipe - The recipe object being edited.
 * @param {function} props.onSave - Function to call when the user clicks 'Save'.
 * @returns {React.ReactElement} A dialog component.
 */
const NotesEditModal = ({ open, onClose, recipe, onSave }) => {
  // We manage the notes text in a local state within the modal.
  // This makes the TextField a "controlled component".
  const [notesText, setNotesText] = useState('');

  
  useEffect(() => {
    // If a recipe is passed to the modal, set our local state to its notes.
    // This populates the textarea when the modal opens.
    if (recipe) {
      setNotesText(recipe.notes);
    }
  }, [recipe]); 

  
  const handleSave = () => {
        onSave(recipe.idMeal, notesText);

  };

  if (!recipe) {
    return null;
  }

  return (
    // The Dialog component from MUI. `onClose` is called when the user clicks
    // the backdrop or presses the Escape key.
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Notes for {recipe.strMeal}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Add or update your personal notes for this recipe.
        </Typography>
        <TextField
          autoFocus // Automatically focus this field when the modal opens.
          margin="dense"
          id="notes"
          label="Your Personal Notes"
          type="text"
          fullWidth
          variant="outlined"
          multiline // This turns the TextField into a <textarea>.
          rows={4} // Sets the default height.
          value={notesText} // The value is controlled by our local state.
          onChange={(e) => setNotesText(e.target.value)} // Update state on every keystroke.
        />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesEditModal;