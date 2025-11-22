const express = require("express");
const router = express.Router();
const { identifyFood } = require("../controllers/visionController");

// POST /api/vision/identify
router.post("/identify", identifyFood);

module.exports = router;
