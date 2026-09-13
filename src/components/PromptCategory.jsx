export default function PromptCategory({
  category,
  prompts,
  setPrompt,
}) {
  return (
    <div
      style={{
        marginBottom: 25,
      }}
    >
      <h3
        style={{
          color: "#FBBF24",
          marginBottom: 12,
        }}
      >
        {category}
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => setPrompt(prompt)}
            style={{
              background: "#374151",
              color: "white",
              border: "none",
              borderRadius: 10,
              padding: "10px 15px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Prompt {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}