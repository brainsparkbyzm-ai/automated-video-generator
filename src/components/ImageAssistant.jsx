import { useState } from "react";
import ai from "../api/openrouter";

export default function ImageAssistant({
  prompt,
  setPrompt,
}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const response = await ai.chat.completions.create({
        model: "google/gemini-2.5-flash",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI image prompt engineer. Help users improve prompts for AI image generation."
          },
          {
            role: "user",
            content: question
          }
        ]
      });

      setPrompt(response.choices[0].message.content);

    } catch (err) {
      console.error(err);
      alert("AI Assistant failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: 30,
        background: "#111827",
        padding: 20,
        borderRadius: 15,
      }}
    >
      <h2>🤖 AI Image Assistant</h2>

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about image generation..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
        }}
      />

      <br />
      <br />

      <button onClick={askAI}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </div>
  );
}