const express = require("express");
const rootRouter = require("./routers/root.router");
const cors = require("cors");
const {
  connectToMongoDb,
  createCollectionDataBase,
} = require("./services/DatabaseServices");
const Collections = require("./services/Collections");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());
const port = process.env.SERVER_PORT;

//get hello world
app.get("/", (req, res) => res.send("Hello World!"));
//get excel services
app.use("/api/", rootRouter);

createCollectionDataBase(new Collections().getListCollections())
  .then((status) => {
    if (status) {
      connectToMongoDb(new Collections().getListCollections())
        .then(() => {
          app.listen(port, () =>
            console.log(`Server started onn port ${port}`)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Create Collection Failed");
      process.exit(1);
    }
  })
  .catch((err) => { });
