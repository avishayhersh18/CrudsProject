const express = require("express");
const path = require("path");

const port = "3000";
const app = express();
app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();
// app.use(express.json());

//routesInit(app);

app.listen(port, () => {
  console.log("the server connected ");
});
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
