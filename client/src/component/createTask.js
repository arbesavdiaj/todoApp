import React, { useState } from "react";
import Api from "../api/taskApi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const YourComponent = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Api.create({
        taskName: taskName,
        description: description,
      });
      console.log(response);
      setMessage("Task created successfully");
      setOpen(false);
    } catch (error) {
      setError("Error creating task: " + error.message);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={handleOpenModal}
      >
        Create Task
      </Button>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
export default YourComponent;
