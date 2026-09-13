import { useState, useEffect } from "react";
import OpenAI from "openai";
import { auth, db } from "../api/firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import ImageHistory from "../components/ImageHistory";
import PremiumButton from "../components/PremiumButton";
import "./ImageStudio.css";

export default function ImageStudio() {
  const ai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });

  const [credits, setCredits] = useState(100);

  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");

  const [style, setStyle] = useState("Realistic");
  const [aspectRatio, setAspectRatio] = useState("1024x1024");

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [savedPrompts, setSavedPrompts] = useState([]);

  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const templates = [
    {
      name: "Portrait",
      prompt:
        "Ultra realistic portrait, cinematic lighting, 85mm lens, masterpiece, 8K",
    },
    {
      name: "Anime",
      prompt:
        "Beautiful anime character, vibrant colors, detailed artwork",
    },
    {
      name: "Fantasy",
      prompt:
        "Epic fantasy warrior, magical forest, glowing sword, cinematic",
    },
    {
      name: "Product",
      prompt:
        "Luxury product photography, studio lighting, realistic shadows",
    },
    {
      name: "Thumbnail",
      prompt:
        "Viral YouTube thumbnail, dramatic lighting, cinematic composition",
    },
  ];

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setCredits(snap.data().credits ?? 100);
        } else {
          await setDoc(userRef, {
            credits: 100,
          });

          setCredits(100);
        }
      } catch (err) {
        console.log(err);
        setCredits(100);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snap = await getDocs(
          collection(db, "users", user.uid, "imageHistory")
        );

        const list = [];

        snap.forEach((d) => {
          list.push({
            id: d.id,
            ...d.data(),
          });
        });

        setHistory(list.reverse());
      } catch (err) {
        console.log(err);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedPrompts");

    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "savedPrompts",
      JSON.stringify(savedPrompts)
    );
  }, [savedPrompts]);
    const randomPrompt = () => {
    const item =
      templates[
        Math.floor(Math.random() * templates.length)
      ];

    setPrompt(item.prompt);
  };

  const savePrompt = () => {
    if (!prompt.trim()) {
      alert("Enter prompt");
      return;
    }

    const item = {
      id: Date.now(),
      text: prompt,
      date: new Date().toLocaleString(),
    };

    setSavedPrompts((prev) => [item, ...prev]);
  };

  const deletePrompt = (id) => {
    setSavedPrompts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const removeImage = (id) => {
    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearHistory = () => {
    setHistory([]);
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

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) {
      alert("Enter prompt");
      return;
    }

    setLoading(true);

    try {
      const response =
        await ai.chat.completions.create({
          model: "openai/gpt-4o-mini",

          messages: [
            {
              role: "system",
              content:
                "Improve this AI image prompt with cinematic details, lighting, camera, environment and quality.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          max_tokens: 400,
        });

      setPrompt(
        response.choices[0].message.content
      );
    } catch (error) {
      console.log(error);
      alert("Enhance Failed");
    }

    setLoading(false);
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Enter prompt");
      return;
    }

    setLoading(true);

    try {
      const finalPrompt = `
${prompt}
Style:${style}
Negative:${negativePrompt}
Ultra detailed
8K
Masterpiece
Professional lighting
High quality
`;

    const url=
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512`;
        console.log("FINAL IMAGE URL:", url);
      setImage(url);
      console.log("SET IMAGE URL:", url);
      const item = {
        image: url,
        prompt,
        style,
        favorite: false,
        date: new Date().toLocaleString(),
      };

      const user = auth.currentUser;

      if (user) {
        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const userSnap = await getDoc(userRef);

        let currentCredits = 100;

        if (userSnap.exists()) {
          currentCredits =
            userSnap.data().credits ?? 100;
        } else {
          await setDoc(userRef, {
            credits: 100,
          });
        }

        const newCredits = Math.max(
          currentCredits - 1,
          0
        );

        await updateDoc(userRef, {
          credits: newCredits,
        });

        setCredits(newCredits);

        await addDoc(
          collection(
            db,
            "users",
            user.uid,
            "imageHistory"
          ),
          item
        );
      }

      setHistory((prev) => [
        {
          id: Date.now(),
          ...item,
        },
        ...prev,
      ]);
    } catch (error) {
      console.log("GENERATION ERROR:", error);
      alert(error.message);
    }

    setLoading(false);
  };

  const generateMultiple = async () => {
    if (!prompt.trim()) {
      alert("Enter prompt");
      return;
    }

    setLoading(true);

    const list = [];

    const cleanPrompt = prompt.substring(0, 150);

    for (let i = 0; i < 4; i++) {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        cleanPrompt + ", " + style
      )}?width=512&height=512&seed=${Date.now() + i}`;

      list.push(url);

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );
    }

    setImages(list);

    setLoading(false);
  };
    return (

    <div className="image-studio">

      <div className="studio-header">

        <div>

          <h1>🎨 BrainSpark Image Studio</h1>

          <p>Professional AI Image Generator</p>

        </div>

        <div className="header-actions">

          <PremiumButton
            onClick={() =>
              setShowPromptLibrary(!showPromptLibrary)
            }
          >
            📚 Library
          </PremiumButton>

          <PremiumButton
            onClick={() =>
              setShowAssistant(!showAssistant)
            }
          >
            🤖 Assistant
          </PremiumButton>

        </div>

      </div>

      <div className="stats-container">

        <div className="stat-box">
          <span>Images</span>
          <h2>{history.length}</h2>
        </div>

        <div className="stat-box">
          <span>Favorites</span>
          <h2>
            {history.filter((x) => x.favorite).length}
          </h2>
        </div>

        <div className="stat-box">
          <span>Prompts</span>
          <h2>{savedPrompts.length}</h2>
        </div>

        <div className="stat-box">
          <span>Credits</span>
          <h2>{credits}</h2>
        </div>

      </div>

      <div className="generator-card">

        <h2>📝 Create Image</h2>

        <label>Style</label>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >

          <option>Realistic</option>
          <option>Cinematic</option>
          <option>Anime</option>
          <option>Fantasy</option>
          <option>3D Render</option>
          <option>Cyberpunk</option>
          <option>Watercolor</option>

        </select>

        <label>Aspect Ratio</label>

        <select
          value={aspectRatio}
          onChange={(e) =>
            setAspectRatio(e.target.value)
          }
        >

          <option value="1024x1024">
            Square
          </option>

          <option value="1792x1024">
            YouTube Thumbnail
          </option>

          <option value="1024x1792">
            Portrait
          </option>

        </select>

        <label>Your Prompt</label>

        <textarea
          rows="7"
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Describe your image..."
        />

        <label>Negative Prompt</label>

        <textarea
          rows="3"
          value={negativePrompt}
          onChange={(e) =>
            setNegativePrompt(e.target.value)
          }
          placeholder="Things to avoid..."
        />

        <div className="button-group">

          <PremiumButton onClick={savePrompt}>
            💾 Save Prompt
          </PremiumButton>

          <PremiumButton onClick={randomPrompt}>
            🎲 Random
          </PremiumButton>

          <PremiumButton onClick={enhancePrompt}>
            ✨ Enhance
          </PremiumButton>

          <PremiumButton
            onClick={generateImage}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "🎨 Generate"}
          </PremiumButton>

          <PremiumButton
            onClick={generateMultiple}
          >
            🖼 4 Variations
          </PremiumButton>

        </div>

      </div>

      {image && (

        <div className="result-card">

          <h2>🖼 Generated Image</h2>

          <div className="image-preview">

            <img
src={image}
alt="Generated"
onLoad={()=>console.log("IMAGE LOADED")}
onError={(e)=>{
console.log("IMAGE FAILED", image);
e.currentTarget.src="/placeholder.png";
}}
/>

          </div>

          <div className="image-actions">

            <button
              onClick={() =>
                copyText(prompt)
              }
            >
              📋 Copy Prompt
            </button>

            <button
              onClick={() => {
                const a =
                  document.createElement("a");

                a.href = image;
                a.download =
                  "BrainSpark-AI.png";

                a.click();
              }}
            >
              ⬇ Download
            </button>

            <button
              onClick={() =>
                copyText(image)
              }
            >
              🔗 Copy URL
            </button>

          </div>

        </div>

      )}
            {images.length > 0 && (

        <div className="result-card">

          <h2>🖼 Multiple Variations</h2>

          <div className="image-grid">

            {images.map((img, index) => (

              <div
                className="image-card"
                key={index}
              >

                <img
                  src={img}
                  alt={`variation-${index}`}
                  onClick={() => setImage(img)}
                />

                <div className="image-actions">

                  <button
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = img;
                      a.download = `BrainSpark-${index + 1}.png`;
                      a.click();
                    }}
                  >
                    ⬇
                  </button>

                  <button
                    onClick={() => setPreviewImage(img)}
                  >
                    👁
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {showPromptLibrary && (

        <div className="library-card">

          <h2>📚 Prompt Library</h2>

          {

            savedPrompts.length === 0 ?

              <p>No Saved Prompts</p>

              :

              savedPrompts.map((item) => (

                <div
                  className="library-item"
                  key={item.id}
                >

                  <div>

                    <h4>{item.text}</h4>

                    <span>{item.date}</span>

                  </div>

                  <div className="library-actions">

                    <button
                      onClick={() => {
                        setPrompt(item.text);
                        setShowPromptLibrary(false);
                      }}
                    >
                      Use
                    </button>

                    <button
                      onClick={() => deletePrompt(item.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

          }

        </div>

      )}

      <ImageHistory

        history={history}

        setImage={setImage}

        setPreviewImage={setPreviewImage}

        clearHistory={clearHistory}

        removeImage={removeImage}

        toggleFavorite={toggleFavorite}

      />
            {previewImage && (

        <div
          className="preview-overlay"
          onClick={() => setPreviewImage("")}
        >

          <img
            src={previewImage}
            alt="Preview"
          />

        </div>

      )}

      {showAssistant && (

        <div className="assistant-box">

          <h3>🤖 AI Prompt Assistant</h3>

          <p>

            Improve prompts by adding:

            <br />
            <br />

            • Subject details

            <br />

            • Camera angle

            <br />

            • Lighting

            <br />

            • Environment

            <br />

            • Style

            <br />

            • Quality keywords

          </p>

          <button
            onClick={() => setShowAssistant(false)}
          >
            Close
          </button>

        </div>

      )}

    </div>

  );

}