const express = require("express");
const rootRouter = require("./routers/root.router");
const app = express();
app.use(express.json());
const port = 5000;

//get hello world
app.get("/", (req, res) => res.send("Hello World!"));
//get excel services
app.use("/api/", rootRouter);
app.listen(port, () => console.log(`Server started on port ${port}`));
