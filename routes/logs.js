const router = require("express").Router();
const path = require("path");
const { getLogs, addLog, updateLog, deleteLog } = require(path.join(
  "..",
  "controllers",
  "logs"
));

router.route("/").get(getLogs).post(addLog);

router.route("/:id").put(updateLog).delete(deleteLog);

module.exports = router;
