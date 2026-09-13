const { searchVideos } = require("./pexelsService");

async function attachVideos(scenes) {

    const updatedScenes = [];

    for (const scene of scenes) {

        console.log("🎬 Finding video:", scene.title);

        const videos = await searchVideos(scene.imagePrompt);

        updatedScenes.push({

            ...scene,

            video:
                videos.length > 0
                    ? videos[0].url
                    : null

        });

    }

    return updatedScenes;

}

module.exports = {
    attachVideos
};