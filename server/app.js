const express = require('express');
const cors = require("cors")
const cookieParser = require('cookie-parser');
const authRoute = require("./routes/authRoutes")
const taskRoute = require("./routes/taskRoutes")
const app = express();

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/task", taskRoute);
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});