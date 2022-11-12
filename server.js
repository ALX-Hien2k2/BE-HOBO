const express = require("express");
const rootRouter = require("./routers/root.router");
const cors = require("cors");
const { connectToMongoDb } = require("./services/DatabaseServices");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());
const port = process.env.SERVER_PORT;

//get hello world
app.get("/", (req, res) => res.send("Hello World!"));
//get excel services
app.use("/api/", rootRouter);

connectToMongoDb()
  .then((client) => {
    app.listen(port, () => console.log(`Server started onn port ${port}`));
    client.close();
  })
  .catch((error) => {
    console.log(error);
  });
