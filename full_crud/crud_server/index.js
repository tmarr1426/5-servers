const express = require("express");
const app = express();
const cors = require("cors")

const crudController = require("./controllers/crud_controller");

const PORT = 8080;

//Required to parse through JSON data that the server receives
app.use(cors());
app.use(express.json());

app.use("/crud", crudController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
