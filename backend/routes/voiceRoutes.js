const express = require("express");

const router = express.Router();


const {
    voiceController
} = require("../controllers/voiceController");



router.post(
    "/generate-voice",
    voiceController
);



module.exports = router;