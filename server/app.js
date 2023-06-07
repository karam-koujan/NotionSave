const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getPagesId = require("./helpers/getPagesId");
const bookmarkController = require("./controllers/bookmark");
const dbIdController = require("./controllers/dbId");
const createDbController = require("./controllers/createDb");
const authController = require("./controllers/auth");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/dbId", dbIdController);
app.post("/api/createDB", createDbController);
app.post("/api/bookmark", bookmarkController);
app.get("/api/auth", authController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
