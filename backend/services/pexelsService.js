const axios = require("axios");

async function searchVideos(query) {

    try {

        console.log("🔍 Pexels Search:", query);

        const response = await axios.get(
            "https://api.pexels.com/videos/search",
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY,
                    "User-Agent": "BrainSpark-AI"
                },
                params: {
                    query,
                    per_page: 5,
                    orientation: "landscape"
                },
                timeout: 10000
            }
        );

        if (!response.data || !response.data.videos) {
            return [];
        }

        return response.data.videos.map(video => ({

            id: video.id,

            duration: video.duration,

            width: video.width,

            height: video.height,

            url:
                video.video_files.find(v => v.quality === "hd")?.link ||
                video.video_files.find(v => v.quality === "sd")?.link ||
                video.video_files[0]?.link

        }));

    } catch (error) {

        console.log("PEXELS ERROR:", error.response?.status || error.message);

        return [];

    }

}

module.exports = {
    searchVideos
};