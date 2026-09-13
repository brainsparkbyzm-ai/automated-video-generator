import { useState, useEffect } from "react";
import {
  sendPrompt,
  searchPexels,
  createVideoProject as renderVideoProject,
  generateVoice,
  generateAIVideo,
} from "../api/chatApi";

import "./VideoStudio.css";

export default function VideoStudio() {
  const [finalVideo, setFinalVideo] = useState("");
  const [renderLoading, setRenderLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState({});
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [videoData, setVideoData] = useState({
  scenes: []
});
  const [imageUrl, setImageUrl] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [sceneVideos, setSceneVideos] = useState({});
  const [style, setStyle] = useState("Cinematic");
  const [duration, setDuration] = useState("10");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [camera, setCamera] = useState("Cinematic Pan");
  const [quality, setQuality] = useState("4K");
  const [aiVideos, setAiVideos] = useState({});
  const [aiLoading, setAiLoading] = useState({});
  const [selectedSource, setSelectedSource] = useState({});

  useEffect(() => {
  console.log("VIDEO DATA CHANGED:", videoData);
  console.log("SCENE TEST:", videoData?.scenes);
}, [videoData]);

  const saveSelectedVideo = (sceneId, url) => {
    setSelectedVideos((prev) => ({
      ...prev,
      [sceneId]: url,
    }));
  };

      const createAIVideo = async (scene) => {
  try {
    setAiLoading((prev) => ({
      ...prev,
      [scene.id]: true,
    }));

    const res = await generateAIVideo(scene.imagePrompt);

    if (res.success) {
      setAiVideos((prev) => ({
        ...prev,
        [scene.id]: res.video,
      }));

      setSelectedSource((prev) => ({
        ...prev,
        [scene.id]: "ai",
      }));
    }
  } catch (err) {
    console.log(err);
  } finally {
    setAiLoading((prev) => ({
      ...prev,
      [scene.id]: false,
    }));
  }
};

  const createVideoProject = async () => {
    try {
      setRenderLoading(true);

      const project = {
  title: videoData?.title,
  script,
  scenes: videoData?.scenes?.map((scene) => ({
    id: scene.id,
    title: scene.title,
    voice: scene.voice,
    imagePrompt: scene.imagePrompt,
    camera: scene.camera,
    animation: scene.animation,

    stockVideo:
      selectedSource[scene.id] === "stock"
        ? selectedVideos[scene.id]
        : null,

    aiVideo:
      selectedSource[scene.id] === "ai"
        ? aiVideos[scene.id]
        : null,
  })),
};
      console.log("PROJECT:", project);

      const response = await renderVideoProject(project);

      if (response.success) {
        setFinalVideo(response.video);
        alert("🎬 Video Render Started Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRenderLoading(false);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await sendPrompt(prompt);

      console.log("FULL RESPONSE:", response);

      if (!response.success) return;

     const newVideoData = {
  ...response.data,
  scenes: Array.isArray(response.data.scenes)
    ? response.data.scenes
    : []
};
console.log("NEW VIDEO DATA SCENES:", newVideoData.scenes);
console.log("SCENE TITLES:", newVideoData.scenes.map(s => s.title));
console.log("FINAL VIDEO DATA:", newVideoData);

setVideoData(newVideoData);
setTimeout(() => {
  console.log("STATE AFTER SET:", videoData);
}, 1000);
console.log("SCENES FROM AI:", response.data.scenes);
console.log(
  "TOTAL SCENES BEFORE RENDER:",
  response.data.scenes.length
);
console.log(
  "CHECK BEFORE SET:",
  response.data.scenes?.length
);


const videos = {};
const selected = {};

      for (const scene of response.data.scenes) {
        const result = await searchPexels(scene.imagePrompt);

        videos[scene.id] = result.videos || [];

        if (result.videos?.length) {
          selected[scene.id] = result.videos[0].video_files?.[0]?.link;

          scene.stockVideo = result.videos[0].video_files?.[0]?.link;
        }
      }

      setSceneVideos(videos);
      setSelectedVideos(selected);
      setScript(response.data.script || "");

      setImageUrl(
        response.data.thumbnailPrompt
          ? `https://image.pollinations.ai/prompt/${encodeURIComponent(
              response.data.thumbnailPrompt
            )}`
          : ""
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generateVoiceAudio = async () => {
    if (!script.trim()) return;

    try {
      setVoiceLoading(true);

      const response = await generateVoice(script);

      if (response.success) {
        setAudioUrl(response.audio);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVoiceLoading(false);
    }
  };

  return (
    <div className="video-studio">
      <div className="bg-grid"></div>
      <div className="bg-glow glow-one"></div>
      <div className="bg-glow glow-two"></div>
      <div className="bg-glow glow-three"></div>

      <header className="hero">
        <div className="hero-chip">
          <span className="chip-dot"></span>
          BrainSpark AI Studio
        </div>

        <h1>Create Hollywood Quality AI Documentaries</h1>

        <p>
          Generate complete documentary scripts, thumbnails and cinematic
          scene prompts in seconds.
        </p>
      </header>

      <section className="studio-layout">
        <div className="left-panel">
          <div className="glass-card">
            <h2>AI Video Generator</h2>

            <textarea
              className="main-textarea"
              rows={7}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your documentary idea..."
            />

            <textarea
              className="main-textarea"
              rows={3}
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Negative prompt..."
            />
                        <div className="control-grid">
              <select
                className="studio-select"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option>Cinematic</option>
                <option>Realistic</option>
                <option>Anime</option>
                <option>Fantasy</option>
                <option>Pixar</option>
                <option>3D</option>
              </select>

              <select
                className="studio-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>

              <select
                className="studio-select"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              >
                <option>16:9</option>
                <option>9:16</option>
                <option>1:1</option>
              </select>

              <select
                className="studio-select"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
              >
                <option>Cinematic Pan</option>
                <option>Drone</option>
                <option>Orbit</option>
                <option>POV</option>
                <option>Static</option>
              </select>

              <select
                className="studio-select"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option>1080p</option>
                <option>2K</option>
                <option>4K</option>
                <option>8K</option>
              </select>
            </div>

            <button
              className="generate-btn"
              onClick={generateVideo}
            >
              {loading ? "Generating AI..." : "Generate Documentary"}
            </button>

            {videoData && (
              <button
                className="project-btn"
                onClick={createVideoProject}
              >
                🎬 Create Video Project
              </button>
            )}

            {renderLoading && (
              <p className="render-status">
                🎞 Rendering Documentary... Please wait
              </p>
            )}

            {finalVideo && (
              <div className="final-video-box">
                <h2>🎬 Final Documentary</h2>

                <video
                  controls
                  className="final-video"
                  src={finalVideo}
                />

                <a
                  className="download-btn"
                  href={finalVideo}
                  download
                >
                  ⬇ Download MP4
                </a>
              </div>
            )}
          </div>

          <div className="glass-card side-card">
            <h3>Studio Status</h3>

            <div className="status-row">
              <span>Engine</span>
              <strong>BrainSpark AI</strong>
            </div>

            <div className="status-row">
              <span>Quality</span>
              <strong>{quality}</strong>
            </div>

            <div className="status-row">
              <span>Camera</span>
              <strong>{camera}</strong>
            </div>

            <div className="status-row">
              <span>Ratio</span>
              <strong>{aspectRatio}</strong>
            </div>

            <div className="status-row">
              <span>Scenes</span>
              <strong>{videoData?.scenes?.length || 0}</strong>
            </div>

            <div className="status-row">
              <span>Status</span>
              <strong className="online">
                {loading ? "Generating..." : "Online"}
              </strong>
            </div>
          </div>
        </div>

        <div className="right-panel">
          {videoData && (
            <div className="result-container">

              <div className="glass-card result-header">
                <h1>{videoData.title}</h1>
                <p>{videoData.description}</p>
              </div>

              {imageUrl && (
                <div className="glass-card thumbnail-card">
                  <h2>AI Thumbnail</h2>

                  <img
                    src={imageUrl}
                    alt="Thumbnail"
                    className="thumbnail-image"
                  />
                </div>
              )}

              <div className="glass-card">
                <h2>Hook</h2>
                <p>{videoData.hook}</p>
              </div>

              <div className="glass-card">
                <h2>Documentary Script</h2>

                <button
                  className="voice-btn"
                  onClick={generateVoiceAudio}
                >
                  {voiceLoading
                    ? "🎙 Generating Voice..."
                    : "🎙 Generate AI Voice"}
                </button>

                {audioUrl && (
                  <audio
                    controls
                    className="audio-player"
                    src={audioUrl}
                  />
                )}

                <p className="script-text">
                  {script}
                </p>
              </div>
                            <div className="glass-card">
                <h2>Total Scenes</h2>

                <div className="scene-count">
                  {videoData.scenes?.length || 0}
                </div>
              </div>
                 
             <div className="scene-grid">
                {Array.isArray(videoData.scenes) &&
                  videoData.scenes.map((scene) => (
                   <div>
                    
                      <div className="scene-top">
                        <div className="scene-number">
                          {scene.id}
                        </div>

                        <div>
                          <h2>{scene.title}</h2>
                          <span>{scene.duration}</span>
                        </div>
                      </div>

                      <div className="scene-content">
                        <h4>Voice</h4>
                        <p>{scene.voice}</p>

                        <h4>Image Prompt</h4>
                        <p>{scene.imagePrompt}</p>

                        <div className="scene-row">
                          <div>
                            <h4>Camera</h4>
                            <p>{scene.camera}</p>
                          </div>

                          <div>
                            <h4>Animation</h4>
                            <p>{scene.animation}</p>
                          </div>
                        </div>

                        <button
                          className="prompt-btn"
                          onClick={() => setPrompt(scene.imagePrompt)}
                        >
                          Use Image Prompt
                        </button>

                        <button
  className="prompt-btn"
  onClick={() => createAIVideo(scene)}
  disabled={aiLoading[scene.id]}
>
  {aiLoading[scene.id]
    ? "Generating AI Video..."
    : "🤖 Generate AI Video"}
</button>

{aiVideos[scene.id] && (
  <div className="stock-video-section">
    <h3>🤖 AI Generated Video</h3>

    <video
      controls
      className="stock-video"
      src={`http://localhost:5000${aiVideos[scene.id]}`}
    />

    <button
      className="select-video-btn"
      onClick={() =>
        setSelectedSource((prev) => ({
          ...prev,
          [scene.id]: "ai",
        }))
      }
    >
      {selectedSource[scene.id] === "ai"
        ? "Selected AI Video"
        : "Use AI Video"}
    </button>
  </div>
)}

                        {sceneVideos[scene.id]?.length > 0 && (
                          <div className="stock-video-section">
                            <h3>🎥 Free Stock Footage</h3>

                            <div className="stock-video-grid">
                              {sceneVideos[scene.id].map((video, index) => (
                                <div
                                  className="stock-video-card"
                                  key={index}
                                >
                                  <video
                                    className="stock-video"
                                    controls
                                    poster={video.image}
                                  >
                                    <source
                                      src={video.video_files?.[0]?.link}
                                      type="video/mp4"
                                    />
                                  </video>

                                  <div className="stock-video-info">
                                    <p>
                                      {video.duration}s
                                    </p>

                                    <button
                                      className="select-video-btn"
                                      onClick={() => {
  saveSelectedVideo(
    scene.id,
    video.video_files?.[0]?.link
  );

  setSelectedSource((prev) => ({
    ...prev,
    [scene.id]: "stock",
  }));
}}
                                    >
                                      {selectedVideos[scene.id] ===
                                      video.video_files?.[0]?.link
                                       ? "Selected Stock Video"
                                        : "Use Stock Video"}
                                    </button>

                                    <a
                                      href={video.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="stock-link"
                                    >
                                      Open Pexels
                                    </a>

                                    {selectedVideos[scene.id] ===
                                      video.video_files?.[0]?.link && (
                                      <div className="selected-badge">
                                        ✅ Selected For Final Video
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
            <section className="feature-section">
        <div className="feature-card">
          <h3>AI Script Writer</h3>
          <p>
            Generate long-form documentary narration with natural storytelling.
          </p>
        </div>

        <div className="feature-card">
          <h3>Scene Planning</h3>
          <p>
            Automatically create professional scene breakdowns with camera
            directions.
          </p>
        </div>

        <div className="feature-card">
          <h3>AI Thumbnail</h3>
          <p>
            Create premium cinematic thumbnail prompts ready for image
            generation.
          </p>
        </div>

        <div className="feature-card">
          <h3>Production Ready</h3>
          <p>
            Everything needed to begin creating your documentary in one place.
          </p>
        </div>
      </section>

      <footer className="studio-footer">
        <h2>BrainSpark AI Studio</h2>
        <p>Powered by Artificial Intelligence</p>
      </footer>
    </div>
  );
}