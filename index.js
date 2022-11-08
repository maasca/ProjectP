const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello, Express	! qergrqeg"));

app.listen(port, () =>
  console.log("Notre application est démarrée sur : http://localhost:${port}")
);
