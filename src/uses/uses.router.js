const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.read).all(methodNotAllowed);
router
  .route("/:useId")
  .get(controller.event)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
