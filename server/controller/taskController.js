const database = require("../config/database");
const task = {
    create: async (req, res) => {
        try {
            const { userId } = req.user;
            const { taskName, description } = req.body;
            const [create] = await database.query("INSERT INTO Task (userId, taskName, description) VALUES (?, ?, ?)", [userId, taskName, description]);
            res.status(200).json({ message: "Task creation success:", create })
        } catch (error) {
            console.error("Error creating task:", error)
            res.status(500).json({ message: "Server error" })
        }
    },
    userTasks: async (req, res) => {
        try {
            const { userId } = req.user;
            const [userTasks] = await database.query("SELECT * FROM Task WHERE userId = ?", [userId]);
            res.status(200).json({ message: "Users tasks fetched ;", userTasks });
        } catch (error) {
            console.error("Error fetching tasks from user:", error);
            res.status(500).json({ message: "Server error" })
        }
    },
    delete: async (req, res) => {
        try {
            const { userId } = req.user;
            const taskId = req.params.taskId;
            const [result] = await database.query("DELETE FROM Task WHERE taskId = ? AND userId = ?", [taskId, userId]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found or you don't have permission to delete it" });
            }
            res.status(200).json({ message: "Task deleted" });
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ message: "Server error" });
        }
    },
    update: async (req, res) => {
        try {
            const { userId } = req.user;
            const taskId = req.params.taskId;
            const { taskName, description } = req.body;
            const [result] = await database.query("UPDATE Task SET taskName = ?, description = ? WHERE taskId = ? AND userId = ?", [taskName, description, taskId, userId]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found or you don't have permission to update it" });
            }
            res.status(200).json({ message: "Task updated" });
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}
module.exports = task