const express = require("express");
const sql = require("mssql");
const XlsxPopulate = require("xlsx-populate");
const sqlConfig = require("./async-mssql");
const rootRouter = require("./routers/root.router");
const app = express();
app.use(express.json());
const port = 5000;

//get hello world
app.get("/", (req, res) => res.send("Hello World!"));
//get excel services
app.use("/api/", rootRouter);
sql.connect(sqlConfig, function (err) {
  if (err) console.log(err);
  else console.log("Connected");
});
app.listen(port, () => console.log(`Server started on port ${port}`));
