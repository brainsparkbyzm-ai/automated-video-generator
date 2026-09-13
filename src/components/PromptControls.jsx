export default function PromptControls({
  enhancePrompt,
  randomPrompt,
  copyPrompt,
  clearAll,
  saveFavoritePrompt,
}) {
  const btnStyle = {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <button
        style={btnStyle}
        onClick={enhancePrompt}
      >
        ✨ Enhance Prompt
      </button>

      <button
        style={btnStyle}
        onClick={randomPrompt}
      >
        🎲 Random Prompt
      </button>

      <button
        style={btnStyle}
        onClick={copyPrompt}
      >
        📋 Copy Prompt
      </button>

      <button
        style={{
          ...btnStyle,
          background: "#F59E0B",
        }}
        onClick={saveFavoritePrompt}
      >
        ⭐ Favorite
      </button>

      <button
        style={{
          ...btnStyle,
          background: "#DC2626",
        }}
        onClick={clearAll}
      >
        🗑 Clear
      </button>
    </div>
  );
}