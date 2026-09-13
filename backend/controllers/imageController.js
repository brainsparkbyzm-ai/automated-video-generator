const axios = require("axios");
const fs = require("fs");
const path = require("path");

const imageController = async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {

            return res.status(400).json({

                success: false,
                message: "Prompt required"

            });

        }

        console.log("================================");
        console.log("🖼 GENERATING IMAGE");
        console.log(prompt);
        console.log("================================");

        const imageUrl =
            `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&nologo=true`;

        const outputFolder = path.join(
            __dirname,
            "..",
            "images",
            "output"
        );

        if (!fs.existsSync(outputFolder)) {

            fs.mkdirSync(outputFolder, {
                recursive: true
            });

        }

        const fileName =
            `image-${Date.now()}.png`;

        const savePath =
            path.join(
                outputFolder,
                fileName
            );

        const response =
            await axios({

                url: imageUrl,

                method: "GET",

                responseType: "stream"

            });

        await new Promise((resolve, reject) => {

            const stream =
                fs.createWriteStream(savePath);

            response.data.pipe(stream);

            stream.on("finish", resolve);

            stream.on("error", reject);

        });

        console.log("✅ IMAGE SAVED:", savePath);

        return res.json({

            success: true,

            image: `/images/${fileName}`,

            prompt

        });

    }

    catch (error) {

        console.log("================================");
        console.log("❌ IMAGE ERROR");
        console.log(error.message);
        console.log("================================");

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    imageController

};