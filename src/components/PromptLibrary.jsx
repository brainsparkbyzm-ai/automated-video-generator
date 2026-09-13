import { useState } from "react";
import promptData from "../data/promptData";
import PromptCategory from "./PromptCategory";
import PromptSearch from "./PromptSearch";

export default function PromptLibrary({ setPrompt }) {
  const [search, setSearch] = useState("");

  return (
    <div
      style={{
        marginTop: 35,
        background: "#111827",
        padding: 25,
        borderRadius: 15,
        color: "white",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        📚 Prompt Library
      </h2>

      <p
        style={{
          color: "#9CA3AF",
          marginBottom: 25,
        }}
      >
        Click any prompt below to instantly use it in the Image Generator.
      </p>

      <PromptSearch
        search={search}
        setSearch={setSearch}
      />

      {Object.entries(promptData).map(([category, prompts]) => {
        const filtered = prompts.filter((prompt) =>
          prompt.toLowerCase().includes(search.toLowerCase())
        );

        if (filtered.length === 0) return null;

        return (
          <PromptCategory
            key={category}
            category={category}
            prompts={filtered}
            setPrompt={setPrompt}
          />
        );
      })}
    </div>
  );
}