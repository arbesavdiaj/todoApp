import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Api from "../api/authApi";
const LogoutButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await Api.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: "none" }}
        onClick={handleOpen}
      >
        Logout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Are you sure you want to logout?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Click "Logout" to confirm logout. */}
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 4 }}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Yes, logout!
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
export default LogoutButton;
