import { useState, useEffect } from "react";
import ImageHistory from "./ImageHistory";
import PromptLibrary from "./PromptLibrary";
import PromptControls from "./PromptControls";
import ImageStyle from "./ImageStyle";
import AspectRatio from "./AspectRatio";
import GenerateButton from "./GenerateButton";
import FavoritePrompts from "./FavoritePrompts";
import ai from "../api/openrouter";
import ThumbnailGenerator from "./ThumbnailGenerator";
import PromptScore from "./PromptScore";
import ImageAssistant from "./ImageAssistant";
import ImageCount from "./ImageCount";
import SaveProjectButton from "./SaveProjectButton";
import ProjectLibrary from "./ProjectLibrary";
import Dashboard from "./Dashboard";

export default function ImageGenerator() {

  // ==========================
  // Main States
  // ==========================

  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("Realistic");
  const [ratio, setRatio] = useState("1:1");
  const [imageCount, setImageCount] = useState(4);

  // ==========================
  // Image History
  // ==========================

  const [history, setHistory] = useState(() => {

    const saved = localStorage.getItem(
      "brainspark-image-history"
    );

    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "brainspark-image-history",
      JSON.stringify(history)
    );

  }, [history]);



  // ==========================
  // Favorite Prompts
  // ==========================

  const [favorites, setFavorites] = useState(() => {

    const saved = localStorage.getItem(
      "brainspark-favorite-prompts"
    );

    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "brainspark-favorite-prompts",
      JSON.stringify(favorites)
    );

  }, [favorites]);



  // ==========================
  // Random Prompt Library
  // ==========================
const [projects, setProjects] = useState(() => {
  const saved = localStorage.getItem("brainspark-projects");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(
    "brainspark-projects",
    JSON.stringify(projects)
  );
}, [projects]);

  const randomPrompts = [

    "A futuristic cyberpunk city at night",

    "A majestic lion wearing a golden crown",

    "A magical floating island above the clouds",

    "Ultra realistic astronaut riding a horse on Mars",

    "Cute cat wearing sunglasses",

    "Ancient temple hidden in a jungle",

    "Luxury modern villa beside the ocean",

    "A dragon flying through a thunderstorm",

    "Ultra realistic YouTube thumbnail about dreams",

    "A mysterious glowing forest at night",

  ];
    // ==========================
  // Prompt Functions
  // ==========================

    const enhancePrompt = async () => {
  if (!prompt.trim()) return;

  try {
    setLoading(true);

    const response = await ai.chat.completions.create({
      model: "google/gemini-2.5-flash",

      max_tokens: 500,

      temperature: 0.7,

      messages: [
        {
          role: "system",
          content:
            "You are an expert AI image prompt engineer. Make every prompt highly detailed and professional. Return only the improved prompt."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    setPrompt(response.choices[0].message.content);

  } catch (err) {
    console.error("OpenRouter Error:", err);

    alert(err.message);

    if (err.status) {
      console.log("Status:", err.status);
    }

    if (err.error) {
      console.log("Error:", err.error);
    }

  } finally {
    setLoading(false);
  }
};

  const randomPrompt = () => {
    const p =
      randomPrompts[
        Math.floor(Math.random() * randomPrompts.length)
      ];

    setPrompt(p);
  };

  const copyPrompt = async () => {
    if (!prompt.trim()) return;

    await navigator.clipboard.writeText(prompt);

    alert("✅ Prompt copied");
  };

  const saveFavoritePrompt = () => {
    if (!prompt.trim()) return;

    if (favorites.includes(prompt)) {
      alert("⭐ Already in favorites");
      return;
    }

    setFavorites((prev) => [prompt, ...prev]);

    alert("✅ Prompt saved");
  };

  const clearAll = () => {
  setPrompt("");
  setNegativePrompt("");
  setImages([]);
};



  // ==========================
  // History Functions
  // ==========================

  const clearHistory = () => {
    setHistory([]);
  };

  const removeImage = (id) => {
    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleFavorite = (id) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              favorite: !item.favorite,
            }
          : item
      )
    );
  };



  // ==========================
  // Generate Image
  // ==========================
    
  const generateImage = () => {

  if (loading) return;

  if (!prompt.trim()) return;

  setLoading(true);
    try {
      let width = 1024;
      let height = 1024;

      if (ratio === "16:9") {
        width = 1280;
        height = 720;
      }

      if (ratio === "9:16") {
        width = 720;
        height = 1280;
      }

      const seed = Math.floor(
        Math.random() * 2147483647
      );

      const finalPrompt = negativePrompt.trim()
        ? `${prompt}. Negative prompt: ${negativePrompt}`
        : prompt;

        
      setTimeout(() => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}, 300);

      const generatedImages = [];

for (let i = 0; i < imageCount; i++) {
  const newSeed = Math.floor(Math.random() * 2147483647);

const url =
  `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?width=${width}&height=${height}&seed=${newSeed}`;
  console.log(url);

  generatedImages.push(url);

  setHistory((prev) => [
    {
      id: Date.now() + i,
      image: url,
      prompt,
      favorite: false,
    },
    ...prev,
  ].slice(0, 20));
}
console.log("Generated Images:", generatedImages);
setImages(generatedImages);

    } catch (err) {

      console.error(err);

      alert("Image generation failed");

    } finally {

      setLoading(false);

    }
  };
     const saveProject = () => {
  if (!prompt.trim()) return;

  const project = {
    id: Date.now(),
    prompt,
    negativePrompt,
    style,
    ratio,
    imageCount,
    images,
    date: new Date().toLocaleString(),
  };

  setProjects((prev) => [project, ...prev]);

  alert("✅ Project Saved");
};

const loadProject = (project) => {
  setPrompt(project.prompt);
  setNegativePrompt(project.negativePrompt);
  setStyle(project.style);
  setRatio(project.ratio);
  setImageCount(project.imageCount);
  setImages(project.images);
};

const deleteProject = (id) => {
  setProjects((prev) =>
    prev.filter((p) => p.id !== id)
  );
};
    return (
    <div
  style={{
    maxWidth: "1400px",
    margin: "30px auto",
    background: "#111827",
    padding: "35px",
    borderRadius: "22px",
    color: "white",
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
    border: "1px solid #1F2937",
  }}
>
     <h1
  style={{
    fontSize: 34,
    fontWeight: 800,
    marginBottom: 5,
  }}
>
🎨 BrainSpark AI Studio
</h1>

<Dashboard
  images={images}
  favorites={favorites}
  history={history}
  projects={projects}
/>

<br />

<p
  style={{
    color: "#9CA3AF",
    marginBottom: 30,
    fontSize: 15,
  }}
>
Create stunning AI images with one click.
Enhance prompts, generate multiple images,
save projects and build professional artwork.
</p>

      {/* Prompt */}
      <textarea
  rows={6}
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Describe your image..."
 style={{
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  resize: "none",
  border: "1px solid #374151",
  background: "#0F172A",
  color: "white",
  fontSize: 15,
  outline: "none",
}}
/>

<PromptScore prompt={prompt} />

      <br />
      <br />

      {/* Negative Prompt */}

      <textarea
        rows={3}
        value={negativePrompt}
        onChange={(e) =>
          setNegativePrompt(e.target.value)
        }
        placeholder="Negative Prompt (optional)..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          resize: "none",
        }}
      />

      <br />
      <br />

      {/* Favorite Prompts */}

      <FavoritePrompts
        favorites={favorites}
        setPrompt={setPrompt}
      />

      {/* Prompt Library */}

      <PromptLibrary
        setPrompt={setPrompt}
      />
      <br />

<ImageAssistant
  prompt={prompt}
  setPrompt={setPrompt}
/>

<br />
      <br />

<ThumbnailGenerator
  setPrompt={setPrompt}
/>

<br />

      {/* Prompt Controls */}

      <PromptControls
        enhancePrompt={enhancePrompt}
        randomPrompt={randomPrompt}
        copyPrompt={copyPrompt}
        clearAll={clearAll}
        saveFavoritePrompt={saveFavoritePrompt}
      />

      <br />

      {/* Style + Ratio */}

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        <ImageStyle
          style={style}
          setStyle={setStyle}
        />

        <AspectRatio
          ratio={ratio}
          setRatio={setRatio}
        />
      </div>

      <br />

      {/* Generate */}

      <GenerateButton
        generateImage={generateImage}
        loading={loading}
      />
<ImageCount
  imageCount={imageCount}
  setImageCount={setImageCount}
/>
      <br />
      <br />
            {/* Image Preview */}

      {images.length > 0 && (
  <>
    <br />
    <br />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: 20,
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            background: "#111827",
            padding: 10,
            borderRadius: 12,
          }}
        >
          <p style={{ color: "white" }}>
  {img}
</p>
          <img
  src={img}
  alt={`Generated ${index + 1}`}
  loading="lazy"
  onError={(e) => {
    e.target.src =
      "https://placehold.co/1024x1024?text=Retry";
  }}
  style={{
    width: "100%",
    borderRadius: 10,
  }}
/>

          <br />
          <br />

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <a href={img} target="_blank" rel="noreferrer">
              <button>🔍 Preview</button>
            </a>

            <a
              href={img}
              download={`BrainSpark-${index + 1}.png`}
            >
              <button>⬇ Download</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  </>
)}
      <br />
      <br />
            {/* Image History */}

      <ImageHistory
        history={history}
        clearHistory={clearHistory}
        removeImage={removeImage}
        toggleFavorite={toggleFavorite}
      />

    </div>
  );
}
