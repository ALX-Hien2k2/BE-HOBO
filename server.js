const express = require("express");
const rootRouter = require("./routers/root.router");
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(cors());

app.use(express.json());
const port = process.env.SERVER_PORT;

//get hello world
app.get("/", (req, res) => res.send("Hello World!"));
//get excel services
app.use("/api/", rootRouter);


app.listen(port, () => console.log(`Server started on port ${port}`));
