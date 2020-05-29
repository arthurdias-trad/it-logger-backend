const router = require("express").Router();
const path = require("path");
const { getTechs, addTech, deleteTech } = require(path.join(
  "..",
  "controllers",
  "techs"
));

router.route("/").get(getTechs).post(addTech);

router.route("/:id").delete(deleteTech);

module.exports = router;
