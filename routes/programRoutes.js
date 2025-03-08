const express = require("express");
const programsController = require("../controllers/contentController/programController");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.get(
  "/",
  verifyToken,
  programsController.getAllPrograms.bind(programsController)
);
router.get(
  "/:id",
  verifyToken,
  programsController.getProgramById.bind(programsController)
);

// Protected routes - require authentication
router.post(
  "/",
  verifyToken,
  programsController.createProgram.bind(programsController)
);
router.put(
  "/:id",
  verifyToken,
  programsController.updateProgram.bind(programsController)
);
router.delete(
  "/:id",
  verifyToken,
  programsController.deleteProgram.bind(programsController)
);

module.exports = router;
