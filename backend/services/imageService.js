const { searchPexels } = require("./pexelsService");

// Future:
// const { generateAIImage } = require("./aiImageService");

async function getImages(scenes) {

    const result = [];

    for (const scene of scenes) {

        try {

            console.log("==================================");
            console.log("🖼 IMAGE SEARCH");
            console.log(scene.title);
            console.log("==================================");

            let stockImage = null;

            try {

                stockImage = await searchPexels(scene.imagePrompt);

            } catch (err) {

                console.log("Stock Image Failed");

            }

            // Future AI Image
            let aiImage = null;

            /*
            if (!stockImage) {

                aiImage = await generateAIImage(scene.imagePrompt);

            }
            */

            result.push({

                ...scene,

                stockImage,

                aiImage,

                image: stockImage || aiImage || null

            });

        } catch (err) {

            console.log("IMAGE ERROR:", err.message);

            result.push({

                ...scene,

                stockImage: null,

                aiImage: null,

                image: null

            });

        }

    }

    return result;

}

module.exports = {
    getImages
};