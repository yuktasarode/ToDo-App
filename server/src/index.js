const express = require("express");
const cookieParser = require("cookie-parser");
const app = express ();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/status", (req, res) => {
    const status = {
       "Status": "Running"
    };
    res.send(status);
 });

const authMiddleware = require("./Middleware/authMiddleware");
app.use('/middleware', authMiddleware);

const userRoutes = require('./User/user');
app.use('/user', authMiddleware, userRoutes);

const taskRoutes = require('./Task/task');
app.use('/task', authMiddleware, taskRoutes);

const authRoutes = require('./Auth/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:",PORT);
  });