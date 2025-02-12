const express = require("express");
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/status", (req, res) => {
    const status = {
       "Status": "Running"
    };
    res.send(status);
 });

const middlewareRoutes = require('./Middleware/middleware');
app.use('/middleware', middlewareRoutes);

const userRoutes = require('./User/user');
app.use('/user', userRoutes);

const taskRoutes = require('./Task/task');
app.use('/task', taskRoutes);

const authRoutes = require('./Auth/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:",PORT);
  });