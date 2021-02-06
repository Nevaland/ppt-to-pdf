const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT);
});
