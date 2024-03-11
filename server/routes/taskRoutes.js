const express = require("express");
const router = express.Router();
const task = require("../controller/taskController");
const middleware = require("../config/middleware");

router.post("/create", middleware, task.create);
router.get("/userTasks", middleware, task.userTasks);
router.delete("/delete/:taskId", middleware, task.delete);
router.put("/update/:taskId", middleware, task.update);

module.exports = router