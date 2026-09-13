const express = require("express");

const router = express.Router();

const {
  pexelsController
} = require("../controllers/pexelsController");

router.post(
  "/pexels",
  pexelsController
);

module.exports = router;