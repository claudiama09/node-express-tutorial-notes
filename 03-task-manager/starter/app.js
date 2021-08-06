require("./db/connect");
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", tasks);

// app.get('api/v1/tasks')        - get all the tasks
// app.post('api/v1/tasks)        - create a new task
// app.get('api/v1/task/:id')     - get single task (it's just a convention that they have the same route)
// app.patch('api/v1/tasks/:id')  - update tasks
// app.delete('api/v1/tasks/id')  - delete task

const port = 5001;

const start = async () => {
  try {
    const result = await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
