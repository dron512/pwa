const express = require("express");
const app = express();

// CRUD
app.get("/", (req, res) => {
  res.send("Hello get");
});
app.post("/", (req, res) => {
  res.send("Hello post");
});
app.put("/", (req, res) => {
  res.send("Hello put");
});
app.delete("/", (req, res) => {
  res.send("hello delete");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
