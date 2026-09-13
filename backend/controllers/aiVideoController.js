const path = require("path");
const fs = require("fs");

const {
    generateAIVideo
} = require("../video/aiVideoGenerator");

const generateAIVideoController = async (req, res) => {

    try {

        const { prompt, sceneId } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        console.log("================================");
        console.log("🎬 AI VIDEO REQUEST");
        console.log("Scene:", sceneId);
        console.log("Prompt:", prompt);
        console.log("================================");

        const fileName = `ai-scene-${sceneId || Date.now()}.mp4`;

        const output = await generateAIVideo(
            prompt,
            fileName
        );

        if (!output || !fs.existsSync(output)) {

            return res.status(500).json({
                success: false,
                message: "AI video generation failed"
            });

        }

        return res.json({

            success: true,

            video: `http://localhost:5000/videos/${path.basename(output)}`,

            localPath: output

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    generateAIVideoController
};