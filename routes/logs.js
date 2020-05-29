const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get logs from DB");
});

router.post("/", (req, res) => {
  res.status(201).send("Add log: " + JSON.stringify(req.body));
});

router.put("/:id", (req, res) => {
  res.status(201).send("Update log with ID: " + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.status(201).send("Delete log with ID: " + req.params.id);
});

module.exports = router;
