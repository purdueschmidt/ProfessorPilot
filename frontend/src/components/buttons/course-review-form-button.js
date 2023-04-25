import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CourseReviewForm } from "../forms/course-review-form";
import "../../styles/components/button.css"

const ReviewFormButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{margin:2}} onClick={handleClickOpen} variant="contained" color="secondary">
        Review Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Course Review Form</DialogTitle>
        <DialogContent>
          <CourseReviewForm handleClose={handleClose} />
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

export default ReviewFormButton;
