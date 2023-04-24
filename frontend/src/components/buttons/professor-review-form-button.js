import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ProfessorReviewForm } from "../forms/professor-review-form";
import "../../styles/components/button.css"

const ProfessorReviewFormButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{margin:2}} size="large" variant="contained" onClick={handleClickOpen} color="secondary">
        Review Professor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Professor Review Form</DialogTitle>
        <DialogContent>
          <ProfessorReviewForm handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfessorReviewFormButton;
