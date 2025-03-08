const express = require("express");
const aboutUsController = require("../controllers/contentController/aboutusController");
const { verifyToken } = require("../middlewares/auth"); // Use destructuring to import

const router = express.Router();

router.get("/", aboutUsController.getAllAboutUs.bind(aboutUsController));
router.get("/:id", aboutUsController.getAboutUsById.bind(aboutUsController));

router.post(
  "/",
  verifyToken,
  aboutUsController.createAboutUs.bind(aboutUsController)
);
router.put(
  "/:id",
  verifyToken,
  aboutUsController.updateAboutUs.bind(aboutUsController)
);
router.delete(
  "/:id",
  verifyToken,
  aboutUsController.deleteAboutUs.bind(aboutUsController)
);

module.exports = router;
