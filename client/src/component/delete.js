import React from "react";
import Api from "../api/taskApi";
import deleteTask from "../api/deleteApi"; // Import the delete function
const DeleteButton = () => {
  const handleDelete = async () => {
    try {
      const deleted = await deleteTask(taskId);
      if (deleted) {
        const response = await Api.userTasks();
        setTasks(response.userTasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
};
export default DeleteButton;
