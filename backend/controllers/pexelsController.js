const axios = require("axios");
console.log("PEXELS KEY:", process.env.PEXELS_API_KEY);

const pexelsController = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query required"
      });
    }

    const response = await axios.get(
      "https://api.pexels.com/videos/search",
      {
        params: {
          query,
          per_page: 10
        },
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    );

    res.json({
      success: true,
      videos: response.data.videos
    });

  } catch (error) {

    console.log("PEXELS ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Pexels request failed"
    });

  }
};

module.exports = {
  pexelsController
};