const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {
    res.status(200).send("Get all logs");
  })
  .post((req, res) => {
    res.status(201).send("Add log: " + JSON.stringify(req.body));
  });

router
  .route("/:id")
  .put((req, res) => {
    res.status(201).send("Update log with ID: " + req.params.id);
  })
  .delete((req, res) => {
    res.status(201).send("Delete log with ID: " + req.params.id);
  });

module.exports = router;
