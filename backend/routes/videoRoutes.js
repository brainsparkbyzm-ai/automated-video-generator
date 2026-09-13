const express = require("express");

const router = express.Router();

const {
    videoController
} = require("../controllers/videoController");

const {
    pexelsController
} = require("../controllers/pexelsController");

const {
    generateAIVideoController
} = require("../controllers/aiVideoController");


// =====================================
// HEALTH TEST
// =====================================

router.get(
    "/test-video",
    (req, res) => {

        console.log("✅ VIDEO TEST ROUTE HIT");

        res.status(200).json({

            success: true,

            message: "Video API route working"

        });

    }
);


// =====================================
// PEXELS SEARCH
// =====================================

router.post(
    "/pexels",
    pexelsController
);


// =====================================
// CREATE VIDEO
// =====================================

router.post(
    "/create-video",
    videoController
);


// =====================================
// AI VIDEO GENERATOR
// =====================================

router.post(
    "/generate-ai-video",
    generateAIVideoController
);


module.exports = router;