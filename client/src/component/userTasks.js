import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Api from "../api/taskApi";
const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTaskData, setUpdatedTaskData] = useState({
    taskName: "",
    description: "",
  });
  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await Api.userTasks();
        setTasks(response.userTasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
        setError("Error fetching tasks. Please try again later.");
        setLoading(false);
      }
    };
    fetchUserTasks();
    const interval = setInterval(fetchUserTasks, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleDelete = async () => {
    try {
      const deleted = await Api.deleteTask(selectedTask.taskId);
      if (deleted) {
        const response = await Api.userTasks();
        setTasks(response.userTasks);
      }
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again later.");
    }
  };
  const handleUpdate = async () => {
    try {
      await Api.updateTask(selectedTask.taskId, updatedTaskData);
      const response = await Api.userTasks();
      setTasks(response.userTasks);
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again later.");
    }
  };
  const handleOpenUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdatedTaskData({
      taskName: task.taskName || "",
      description: task.description || "",
    });
    setUpdateModalOpen(true);
  };
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Table>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={2}>{error}</TableCell>
            </TableRow>
          ) : tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No tasks available.</TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.taskId}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${task.taskId}-content`}
                      id={`panel-${task.taskId}-header`}
                    >
                      <Typography className="task-name">
                        {task.taskName || "Unnamed Task"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ maxWidth: "400px" }}>
                        <Typography className="task-description">
                          {task.description || "No description available."}
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedTask(task);
                      handleOpenUpdateModal(task);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setSelectedTask(task);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
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
          <Typography variant="h6" component="h2">
            Update Task
          </Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Task Name"
              value={
                updatedTaskData.taskName ||
                (selectedTask ? selectedTask.taskName : "")
              }
              onChange={(e) =>
                setUpdatedTaskData({
                  ...updatedTaskData,
                  taskName: e.target.value,
                })
              }
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              value={
                updatedTaskData.description ||
                (selectedTask ? selectedTask.description : "")
              }
              onChange={(e) =>
                setUpdatedTaskData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="outlined">
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => setUpdateModalOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
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
          <Typography variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography>Are you sure you want to delete this task?</Typography>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default TaskComponent;
