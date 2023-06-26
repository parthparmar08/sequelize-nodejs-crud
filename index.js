const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = require("./routes/empRoutes.js");

app.use("/api/emp", router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to P@rth Application" });
});

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`.................Server is running on port ${PORT}..................`);
});
