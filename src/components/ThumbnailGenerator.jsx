import { useState } from "react";

export default function ThumbnailGenerator({ setPrompt }) {
  const [topic, setTopic] = useState("");

  const generateThumbnail = () => {
    if (!topic.trim()) return;

    const prompt = `
Ultra realistic YouTube thumbnail about "${topic}",
dramatic cinematic lighting,
high contrast,
professional composition,
emotional subject,
vibrant colors,
8K,
HDR,
masterpiece,
high CTR,
viral YouTube thumbnail,
16:9 aspect ratio,
sharp focus,
professional color grading
`;

    setPrompt(prompt);
  };

  return (
    <div
      style={{
        background: "#111827",
        padding: 20,
        borderRadius: 15,
        marginTop: 30,
      }}
    >
      <h2>📺 Thumbnail Prompt Generator</h2>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Video Topic..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          marginTop: 15,
        }}
      />

      <button
        onClick={generateThumbnail}
        style={{
          marginTop: 15,
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        🚀 Generate Thumbnail Prompt
      </button>
    </div>
  );
}